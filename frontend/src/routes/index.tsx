import { useRoutes } from 'react-router-dom';

// Project Routes
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
  return useRoutes([...LoginRoutes]);
}
