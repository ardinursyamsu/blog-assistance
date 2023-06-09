export default function Navbar(props: any) {
  const isAuth = props.isAuth;
  const dataTheme = "business";
  return (
    <div data-theme={dataTheme} className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          <img src="/logo.png" width="36" />
          {/*<div className="mx-2">Home</div>*/}
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isAuth ? (
            <li>
              <a href="/admin">Admin</a>
            </li>
          ) : (
            ""
          )}
          {/*
          <li tabIndex={0}>
            <a>
              Parent
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </li>*/}
          {isAuth ? (
            <li>
              <a href="/logout">Logout</a>
            </li>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
