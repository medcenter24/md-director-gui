export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'cases',
        data: {
          menu: {
            title: 'general.menu.cases',
            icon: 'fa fa-ambulance',
            selected: false,
            expanded: false,
            order: 1
          }
        }
      },
      {
        path: 'companions',
        data: {
          menu: {
            title: 'Address Book',
            icon: 'fa fa-address-book-o'
          }
        },
        children: [{
          path: 'patients',
          data: {
            menu: {
              title: 'general.menu.patients'
            }
          }
        }, {
            path: 'assistants',
            data: {
              menu: {
                title: 'general.menu.assistants'
              }
            }
        }]
      },
      {
        path: 'accidents',
        data: {
          menu: {
            title: 'general.menu.accidents',
            icon: 'fa fa-info-circle'
          }
        },
        children: [
          {
            path: 'checkpoints',
            data: {
              menu: {
                title: 'general.menu.checkpoints'
              }
            }
          },
          {
            path: 'statuses',
            data: {
              menu: {
                title: 'general.menu.statuses'
              }
            }
          },
          {
            path: 'types',
            data: {
              menu: {
                title: 'general.menu.types'
              }
            }
          }
        ]
      },
      {
        path: 'geo',
        data: {
          menu: {
            title: 'general.menu.geo',
            icon: 'ion-android-pin'
          }
        },
        children: [
          {
            path: 'cities',
            data: {
              menu: {
                title: 'general.menu.cities'
              }
            }
          },
          {
            path: 'hospitals',
            data: {
              menu: {
                title: 'general.menu.hospitals'
              }
            }
          }
        ]
      },
      {
        path: 'doctors',
        data: {
          menu: {
            title: 'general.menu.doctors',
            icon: 'fa fa-user-md'
          }
        },
        children: [
          {
            path: 'stuff',
            data: {
              menu: {
                title: 'general.menu.stuff'
              }
            }
          },
          {
            path: 'diagnostics',
            data: {
              menu: {
                title: 'general.menu.diagnostics'
              }
            }
          },
          {
            path: 'services',
            data: {
              menu: {
                title: 'general.menu.services'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.doctor',
            url: 'https://myDoctors24.com/doctor',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
