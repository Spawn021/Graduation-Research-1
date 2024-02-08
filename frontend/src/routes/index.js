//route.js
//Layout
import { HeaderOnly } from '~/components/Layout';
//Page
import Home from '~/pages/Home';
import News from '~/pages/News';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Member from '~/pages/Member';
import Research from '~/pages/Research';
import MainResearch from '~/pages/Research/MainResearch';
import PastProject from '~/pages/Research/PastProject';
import Publication from '~/pages/Publication';
import Contact from '~/pages/Contact';
import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Activity from '~/pages/Admin/Activity';
import Instructor from '~/pages/Admin/Instructor';
import Student from '~/pages/Admin/Student';
import PublicationAdmin from '~/pages/Admin/Publication';
//public routes
const publicRoutes = [
   { path: '/', component: Home },
   { path: '/news', component: News },
   { path: '/member/:id', component: Member },
   // { path: '/research/main_research', component: MainResearch },
   {
      path: '/research',
      component: Research,
      children: [
         { path: 'main_research', element: <MainResearch /> },
         { path: 'past_project', element: <PastProject /> },
      ],
   },

   { path: '/publication', component: Publication },
   { path: '/contact', component: Contact },
   { path: '/upload', component: Upload, layout: HeaderOnly },
   { path: '/search', component: Search, layout: null },
];
const privateRoutes = [
   { path: '/login', component: Login, layout: null },
   {
      path: '/admin',
      component: Admin,
      layout: null,
      children: [
         { path: 'instructor', element: <Instructor />, layout: null },
         { path: 'student', element: <Student />, layout: null },
         { path: 'publication', element: <PublicationAdmin />, layout: null },
         { path: 'activity', element: <Activity />, layout: null },
      ],
   },
];

export { publicRoutes, privateRoutes };
