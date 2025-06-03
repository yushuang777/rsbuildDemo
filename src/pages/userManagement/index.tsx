import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { useHooks } from './hooks';
import { tableDataInterface } from './common/typeInterface/userManagementInterface';
import { EMAIL_REGEX, PHONE_REGEX } from './common/regux';

function index() {
  const { state, form, showModal, handleCancel, handleOk, handleDelete } =
    useHooks();
  const { tableData, isModalVisible, currentUser } = state;

  const tableColunms = [
    { title: '姓名', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '电话', dataIndex: 'phone' },
    {
      title: '操作',
      render: (_: any, record: tableDataInterface) => (
        <>
          <Button onClick={() => showModal(record)}>编辑</Button>
          <Popconfirm
            title="确认删除此用户?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button style={{ marginLeft: 8 }}>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        添加用户
      </Button>
      <Table dataSource={tableData} columns={tableColunms} rowKey="id" />
      <Modal
        title={currentUser.id ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" onClick={handleOk}>
            {currentUser.id ? '保存' : '添加'}
          </Button>
        }
      >
        <Form form={form}>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
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
