export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
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
        path: 'accidents',
        data: {
          menu: {
            title: 'Accidents',
            icon: 'fa fa-info-circle',
          },
        },
        children: [
          {
            path: 'checkpoints',
            data: {
              menu: {
                title: 'Checkpoints',
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
        ],
      },
      {
        path: 'geo',
        data: {
          menu: {
            title: 'Geo',
            icon: 'ion-android-pin',
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
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank',
          },
        },
      },
    ],
  },
];
