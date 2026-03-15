import getRoutes from '../mock/getRoutes';
import getUserInfo from '../mock/getUserInfo';
import login from './login';

export default [...getRoutes, ...getUserInfo, ...login];
