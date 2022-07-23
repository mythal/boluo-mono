import { lazy } from 'react';
import { useRouter } from 'next/router';

interface RouteItem {
  title: string;
  component: ReturnType<typeof lazy>;
}

const createRouteTable = <T extends { [key: string]: RouteItem }>(table: T) => table;

export const tabRouteTable = createRouteTable({
  '': {
    title: 'Design',
    component: lazy(() => import('./Home.mdx')),
  },
  buttons: {
    title: 'Buttons',
    component: lazy(() => import('./ButtonDesign')),
  },
  forms: {
    title: 'Form',
    component: lazy(() => import('./FormDesign')),
  },
  'error-handling': {
    title: 'Error Handling',
    component: lazy(() => import('./ErrorHandlingDesign')),
  },
  notifications: {
    title: 'Notifications',
    component: lazy(() => import('./NotificationDesign')),
  },
  popovers: {
    title: 'Popovers',
    component: lazy(() => import('./PopoverDesign')),
  },
  sortable: {
    title: 'Sortable',
    component: lazy(() => import('./SortableDesign')),
  },
  virtual: {
    title: 'Virtual List',
    component: lazy(() => import('./VirtualListDesign')),
  },
  colors: {
    title: 'Colors',
    component: lazy(() => import('./ColorDesign')),
  },
  loading: {
    title: 'Loading',
    component: lazy(() => import('./LoadingDesign')),
  },
  dialogs: {
    title: 'Dialog',
    component: lazy(() => import('./DialogDesign')),
  },
  font: {
    title: 'Font',
    component: lazy(() => import('./FontDesign')),
  },
});

export const useDesignRoute = (): keyof typeof tabRouteTable => {
  const router = useRouter();
  const { params } = router.query;
  if (!params || !(params instanceof Array) || !params[0]) {
    return '';
  }
  const tab = params[0];
  if (tabRouteTable.hasOwnProperty(tab)) {
    return tab as keyof typeof tabRouteTable;
  } else {
    return '';
  }
};
