import { tableDataInterface } from './common/typeInterface/userManagementInterface';

interface State {
  tableData: tableDataInterface[];
  currentUser: tableDataInterface;
  isModalVisible: boolean;
}
type Action = CustomActions<State>;
export const initialState: State = {
  tableData: [
    {
      id: '1',
      name: '张三',
      age: '12',
      email: '123@example.com',
      phone: '123456789',
    },
    {
      id: '2',
      name: '李四',
      age: '12',
      email: '121233@example.com',
      phone: '987654321',
    },
  ],
  currentUser: {
    id: '',
    name: '',
    email: '',
    age: '',
    phone: '',
  },
  isModalVisible: false,
};

export function reducer(state: State = initialState, action: Action): State {
  const newstate = { ...state };
  switch (action.type) {
    case 'setTableDataAction':
      newstate.tableData = action.payload;
      return newstate;
    case 'setCurrentUserAction':
      newstate.currentUser = action.payload;
      return newstate;
    case 'setIsModalVisibleAction':
      newstate.isModalVisible = action.payload;
      return newstate;

    case 'resetStateAction':
      return initialState;
    default:
      throw new Error('action not match');
  }
}

export const actions: ActionFunctions<State> = {
  setTableDataAction: function (
    val: tableDataInterface[]
  ): CustomActionFromKeyState<'setTableDataAction', State> {
    return {
      type: 'setTableDataAction',
      payload: val,
    };
  },
  setCurrentUserAction: function (
    val: tableDataInterface
  ): CustomActionFromKeyState<'setCurrentUserAction', State> {
    return {
      type: 'setCurrentUserAction',
      payload: val,
    };
  },
  setIsModalVisibleAction: function (
    val: boolean
  ): CustomActionFromKeyState<'setIsModalVisibleAction', State> {
    return {
      type: 'setIsModalVisibleAction',
      payload: val,
    };
  },

  resetStateAction: function (): CustomActionFromKeyState<
    'resetStateAction',
    State
  > {
    return {
      type: 'resetStateAction',
      payload: undefined,
    };
  },
};
