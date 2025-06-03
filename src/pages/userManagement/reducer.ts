import { tableDataInterface } from '../common/typeInterface/userManagementInterface';

interface State {
  tableData: tableDataInterface[];
  currentUser: tableDataInterface;
  isEditModalVisible: boolean;
  selectedKeys: React.Key[];
  isAddModalVisible: boolean;
}
type Action = CustomActions<State>;
export const initialState: State = {
  tableData: [],
  currentUser: {
    id: '',
    name: '',
    email: '',
    age: '',
    phone: '',
  },
  isEditModalVisible: false,
  selectedKeys: [],
  isAddModalVisible: false,
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
    case 'setIsEditModalVisibleAction':
      newstate.isEditModalVisible = action.payload;
      return newstate;
    case 'setSelectedKeysAction':
      newstate.selectedKeys = action.payload;
      return newstate;
    case 'setIsAddModalVisibleAction':
      newstate.isAddModalVisible = action.payload;
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
  setIsEditModalVisibleAction: function (
    val: boolean
  ): CustomActionFromKeyState<'setIsEditModalVisibleAction', State> {
    return {
      type: 'setIsEditModalVisibleAction',
      payload: val,
    };
  },

  setSelectedKeysAction: function (
    val: React.Key[]
  ): CustomActionFromKeyState<'setSelectedKeysAction', State> {
    return {
      type: 'setSelectedKeysAction',
      payload: val,
    };
  },

  setIsAddModalVisibleAction: function (
    val: boolean
  ): CustomActionFromKeyState<'setIsAddModalVisibleAction', State> {
    return {
      type: 'setIsAddModalVisibleAction',
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
