var routes = [
  // Index Page
  {
    path: '/',
    url: './index.html',
    name: 'index',
  },

  // Profile page - Added
  {
    path: '/profile/',
    componentUrl: './pages/profile.html',

  },
  // Settings added by will
  {
    path: '/setting/',
    url: './pages/setting.html',

  },

  // Update user name - Added
  {
    path: '/update-user/',
    componentUrl: './pages/update-user.html',

  },

  // Admin page - Added
  {
    path: '/admin/',
    componentUrl: './pages/admin.html',

  },

  // My Events page - Added
  {
    path: '/myevents/',
    componentUrl: './pages/my-events.html',

  },

  // My Past Events page - Added
  {
    path: '/my-past-events/',
    componentUrl: './pages/my-past-events.html',

  },

  {
    path: '/mynotifications/',
    componentUrl: './pages/my-notifications.html',

  },

  // My Event View - Added
 {
   // path: '/update-event/:key/',
   path: '/view-my-event/:key',
   componentUrl: './pages/view-my-event.html',
 },

  // Add/Edit Events page - Added
  {
    path: '/add-edit-events/',
    componentUrl: './pages/add-edit-events.html',
  },

  // Add Event page - Added
  {
    path: '/add-event/',
    componentUrl: './pages/add-event.html',
  },

   // Update Event page - Added
  {
    path: '/update-event/:key',
    componentUrl: './pages/update-event.html',
  },

  // Update Past Event page - Added
 {
   path: '/past-update-event/:key',
   componentUrl: './pages/past-update-event.html',
 },

  // Edit/View past deleted events - Added
  {
    path: '/past-deleted-events/',
    componentUrl: './pages/past-deleted-events.html',
  },


  // Add/Edit Clubs page - Added
  {
    path: '/add-edit-clubs/',
    componentUrl: './pages/add-edit-clubs.html',
  },

  // Update Club page - Added
 {
   // path: '/update-event/:key/',
   path: '/update-club/:key',
   componentUrl: './pages/update-club.html',
 },

  // Add page - Added
  {
    path: '/add-club/',
    componentUrl: './pages/add-club.html',
  },

  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
