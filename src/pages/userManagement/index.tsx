import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { useHooks } from './hooks';
import { tableDataInterface } from '../common/typeInterface/userManagementInterface';
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from '../common/regux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
function index() {
  const {
    state,
    addform,
    editform,
    showAddModal,
    showEditModal,
    handleEditCancel,
    handleEditOk,
    handleDelete,
    handleSearch,
    handleReset,
    handleTableChange,
    handleAddCancel,
    handleAddOk,
  } = useHooks();
  const { tableData, isEditModalVisible, selectedKeys, isAddModalVisible } =
    state;
  const { Search } = Input;
  const tableColunms = [
    { title: '姓名', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '电话', dataIndex: 'phone' },
    {
      title: '操作',
      render: (_: any, record: tableDataInterface) => (
        <>
          <Button onClick={() => showEditModal(record)}>编辑</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="搜索用户（姓名、邮箱、电话）"
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
        allowClear
        onClear={() => handleReset()}
      />
      <Button
        type="primary"
        style={{ marginLeft: 8 }}
        onClick={() => showAddModal()}
      >
        批量添加用户
      </Button>
      <Popconfirm title="确认删除?" onConfirm={() => handleDelete()}>
        <Button style={{ marginLeft: 8 }}>批量删除</Button>
      </Popconfirm>
      <Table
        dataSource={tableData}
        columns={tableColunms}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (selectedKeys) => {
            handleTableChange(selectedKeys);
          },
        }}
      />
      <Modal
        width={600}
        title={'批量新增用户用户'}
        open={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={
          <Button type="primary" onClick={handleAddOk}>
            新增
          </Button>
        }
      >
        <div style={{ margin: '12px 0', width: '100%' }}>
          <Form form={addform} style={{ width: '100%' }}>
            <Form.List name="addList">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      style={{
                        marginBottom: 16,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Form.Item
                          name={[field.name, 'name']}
                          label="姓名"
                          rules={[
                            { required: true, message: '请输入姓名' },
                            {
                              pattern: NAME_REGEX,
                              message: '请输入正确的姓名',
                            },
                          ]}
                        >
                          <Input maxLength={10} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'email']}
                          label="邮箱"
                          rules={[
                            { required: true, message: '请输入邮箱' },
                            {
                              pattern: EMAIL_REGEX,
                              message: '请输入有效的邮箱地址',
                            },
                            { max: 50, message: '邮箱长度不能超过50个字符' },
                          ]}
                        >
                          <Input maxLength={50} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'phone']}
                          label="电话"
                          rules={[
                            { required: true, message: '请输入电话' },
                            {
                              pattern: PHONE_REGEX,
                              message: '请输入有效的手机号码',
                            },
                          ]}
                        >
                          <Input maxLength={11} style={{ width: '100%' }} />
                        </Form.Item>
                      </div>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                          style={{
                            color: 'red',
                            marginLeft: 16,
                            alignSelf: 'center',
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '100%' }}
                      icon={<PlusOutlined />}
                    >
                      新增用户
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </Modal>

      <Modal
        title={'编辑用户'}
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={
          <Button type="primary" onClick={handleEditOk}>
            {'保存'}
          </Button>
        }
      >
        <Form form={editform}>
          <Form.Item hidden={true} name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: '请输入姓名' },
              { pattern: NAME_REGEX, message: '请输入正确的姓名' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { pattern: EMAIL_REGEX, message: '请输入有效的邮箱地址' },
              { max: 50, message: '邮箱长度不能超过50个字符' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[
              { required: true, message: '请输入电话' },
              { pattern: PHONE_REGEX, message: '请输入有效的手机号码' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default index;
