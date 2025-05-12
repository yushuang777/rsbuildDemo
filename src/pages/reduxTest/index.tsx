import { useSelector, useDispatch } from 'react-redux';
import { increment, incrementAsync } from './reducer';
// 修改导入内容，只导入类型
import type { RootState, AppDispatch } from '../../store';

// 创建自定义的 useAppDispatch 和 useAppSelector 钩子
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelector;

function index() {
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      {counter}
      <div>
        <button
          onClick={() => {
            dispatch(increment(1));
          }}
        >
          add+1
        </button>
        <button
          onClick={() => {
            dispatch(incrementAsync(1));
          }}
        >
          addAsync+1
        </button>
      </div>
    </>
  );
}

export default index;
