const getNavigation = (user) => {

  const authLinks = [
    {
      title: "Base",
      link: "/home",
      section: [{
        title: "Industrial",
        type: "/industrial",
      },
      {
        title: "Army",
        type: "/army",
      }]
    },
    {
      title: "Factory",
      link: "/factory",
      section: [{
        title: "Infantry",
        type: "/infantry"
      },
      {
        title: "Armored",
        type: "/armored"
      },
      {
        title: "Helicopters",
        type: "/helicopter"
      },
      {
        title: "Fighters",
        type: "/fighter"
      },
      {
        title: "Defance",
        type: "/defance"
      }]
    },
    {
      title: "Ranking",
      link: `/ranking`,
      section: []
    },
    {
      title: "Profile",
      link: `/profile/${user && user.id}`,
      section: [{
        title: "Reports",
        type: "/reports",
      },
      {
        title: "Settings",
        type: "/settings",
      }]
    },
    {
      title: "Logout",
      link: `/logout`,
      section: []
    }
  ]

  const guestLinks = [
    {
      title: "Ranking",
      link: "/",//!
      section: []
    },
    {
      title: "Register",
      link: "/register",
      section: []
    },
    {
      title: "Login",
      link: "/login",
      section: []
    }
  ]
  const loggedIn = user && user.loggedIn
  return loggedIn ? authLinks : guestLinks
}

export default getNavigation