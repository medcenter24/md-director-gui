import { isDevMode } from '@angular/core';

const menu = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'fa fa-home',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'cases',
        data: {
          menu: {
            title: 'Cases',
            icon: 'fa fa-ambulance',
            selected: false,
            expanded: false,
            order: 1,
          },
        },
      },
      {
        path: 'companions',
        data: {
          menu: {
            title: 'Address Book',
            icon: 'fa fa-address-book-o',
          },
        },
        children: [{
          path: 'patients',
          data: {
            menu: {
              title: 'Patients',
            },
          },
        }, {
            path: 'assistants',
            data: {
              menu: {
                title: 'Assistants',
              },
            },
        }],
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'Settings',
            icon: 'fa fa-info-circle',
          },
        },
        children: [
          {
            path: 'periods',
            data: {
              menu: {
                title: 'Date Periods',
              },
            },
          },
          {
            path: 'finance',
            data: {
              menu: {
                title: 'Finance',
              },
            },
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: 'doc_templates',
              },
            },
          },
          {
            path: 'checkpoints',
            data: {
              menu: {
                title: 'Checkpoints',
              },
            },
          },
        ],
      },
      {
        path: 'geo',
        data: {
          menu: {
            title: 'Geo',
            icon: 'fa fa-map-marker',
          },
        },
        children: [
          {
            path: 'cities',
            data: {
              menu: {
                title: 'Cities',
              },
            },
          },
          {
            path: 'hospitals',
            data: {
              menu: {
                title: 'Hospitals',
              },
            },
          },
        ],
      },
      {
        path: 'doctors',
        data: {
          menu: {
            title: 'Doctors',
            icon: 'fa fa-user-md',
          },
        },
        children: [
          {
            path: 'stuff',
            data: {
              menu: {
                title: 'Stuff',
              },
            },
          },
          {
            path: 'diagnostics',
            data: {
              menu: {
                title: 'Diagnostics',
              },
            },
          },
          {
            path: 'services',
            data: {
              menu: {
                title: 'Services',
              },
            },
          },
          {
            path: 'surveys',
            data: {
              menu: {
                title: 'Surveys',
              },
            },
          },
        ],
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profile',
            icon: 'fa fa-user',
          },
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Doctor',
            url: 'https://doctor.myDoctors24.com',
            icon: 'fa fa-sign-in',
            order: 800,
            target: '_blank',
          },
        },
      },
      {
        path: 'development',
        data: {
          menu: {
            title: 'Development',
            icon: 'fa fa-wrench',
          },
        },
        children: [{
          path: 'gui',
          data: {
            menu: {
              title: 'GUI',
            },
          },
        }],
      },
    ],
  },
];

if (!isDevMode()) {
   menu[0].children.filter(v => v.path !== 'development');
}
export const PAGES_MENU = menu;
