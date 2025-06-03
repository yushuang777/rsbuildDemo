import { useReducer } from 'react';
import { actions, initialState, reducer } from './reducer';
import { Form, message } from 'antd';
import { tableDataInterface } from '../common/typeInterface/userManagementInterface';
import useManagementStore from '../store/managementStore';
export function useHooks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addform] = Form.useForm();
  const [editform] = Form.useForm();
  const { tableData, currentUser, selectedKeys } = state;
  const { updateTableData, tableDataStore } = useManagementStore();

  const showEditModal = (user: tableDataInterface) => {
    dispatch(actions.setCurrentUserAction(user));
    editform.setFieldsValue(user);
    dispatch(actions.setIsEditModalVisibleAction(true));
  };

  const handleEditCancel = () => {
    editform.resetFields();
    dispatch(actions.setIsEditModalVisibleAction(false));
    dispatch(actions.setCurrentUserAction({} as tableDataInterface));
  };

  const handleEditOk = async () => {
    const formValues = await editform.validateFields();
    const updateTable = tableData.map((item) =>
      item.id === currentUser.id ? { ...item, ...formValues } : item
    );
    dispatch(actions.setTableDataAction(updateTable));
    updateTableData(updateTable);
    handleEditCancel();
  };

  const handleDelete = () => {
    if (selectedKeys.length === 0) {
      message.warning('请先勾选要删除的信息');
      return;
    }
    const updateTable = tableData.filter(
      (item) => !selectedKeys.includes(item.id)
    );
    dispatch(actions.setTableDataAction(updateTable));
    updateTableData(updateTable);
  };

  const handleSearch = (value: string) => {
    const filtered = tableDataStore.filter(
      (item: tableDataInterface) =>
        item.name.includes(value) ||
        item.email.includes(value) ||
        item.phone.includes(value)
    );
    dispatch(actions.setTableDataAction(filtered));
  };

  const handleReset = () => {
    dispatch(actions.setTableDataAction(tableDataStore));
  };

  const handleTableChange = (selectedKeys: React.Key[]) => {
    dispatch(actions.setSelectedKeysAction(selectedKeys));
  };

  const showAddModal = () => {
    dispatch(actions.setIsAddModalVisibleAction(true));
  };

  const handleAddCancel = () => {
    addform.resetFields();
    dispatch(actions.setIsAddModalVisibleAction(false));
  };

  const handleAddOk = async () => {
    const formValues = await addform.validateFields();
    const addIdtableData = formValues?.addList?.map((item: any) => ({
      ...item,
      id: Math.random().toString(36).substring(2, 9),
    }));
    console.log(addIdtableData);
    const updatedTableData = [...tableData, ...addIdtableData];
    dispatch(actions.setTableDataAction(updatedTableData));
    updateTableData(updatedTableData);
    handleAddCancel();
  };

  return {
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
  };
}
