import { useReducer } from 'react';
import { actions, initialState, reducer } from './reducer';
import { Form } from 'antd';
import { tableDataInterface } from '../common/typeInterface/userManagementInterface';

export function useHooks() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const { tableData, currentUser } = state;

  const showModal = (user?: tableDataInterface) => {
    if (user) {
      dispatch(actions.setCurrentUserAction(user));
      form.setFieldsValue(user);
    }
    dispatch(actions.setIsModalVisibleAction(true));
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(actions.setIsModalVisibleAction(false));
    dispatch(actions.setCurrentUserAction({} as tableDataInterface));
  };

  const handleOk = async () => {
    const formValues = await form.validateFields();
    if (currentUser.id) {
      // 编辑用户
      const updateTableData = tableData.map((item) =>
        item.id === currentUser.id ? { ...item, ...formValues } : item
      );
      dispatch(actions.setTableDataAction(updateTableData));
    } else {
      // 添加用户
      const newUser = { id: tableData?.length + 1, ...formValues };
      dispatch(actions.setTableDataAction([...tableData, newUser]));
    }
    handleCancel();
  };

  const handleDelete = (id: string) => {
    const updateTableData = tableData.filter((item) => item.id !== id);
    dispatch(actions.setTableDataAction(updateTableData));
  };
  return { state, form, showModal, handleCancel, handleOk, handleDelete };
}
