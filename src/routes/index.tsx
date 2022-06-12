
import { lazy, Suspense } from 'react';
import {Route, Routes} from 'react-router-dom';

const ItemList = lazy(() => import('../pages/ItemList'));
const Dashboard = lazy(() => import('../pages/Dashboard'));


const AppRoutes = () => {
    
return (
    <Suspense fallback={<>Loading....</>}>
        <Routes>
            {ROUTES.map((route, index) => (
                <Route key={index} element={route.component} path={route.path} />
            ))}
        </Routes>
    </Suspense>
);
};

export default AppRoutes;

const ROUTES  = [{
    path: '/view-items',
    component: <ItemList/>
},
{
    path: '/',
    component: <Dashboard />
}
];