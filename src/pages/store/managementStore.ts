import { create } from 'zustand';
import { tableDataInterface } from '../common/typeInterface/userManagementInterface';

interface State {
  tableDataStore: tableDataInterface[];
  updateTableData: (newData: tableDataInterface[]) => void;
}

const useManagementStore = create<State>((set) => ({
  tableDataStore: [],
  updateTableData: (newData) => set({ tableDataStore: newData }),
}));

export default useManagementStore;
