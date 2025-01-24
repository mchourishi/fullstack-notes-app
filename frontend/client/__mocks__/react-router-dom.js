const mockNavigate = jest.fn();
const mockLocation = {
  pathname: "/",
  hash: "",
  search: "",
  state: null,
};

export const useNavigate = () => mockNavigate;
export const useLocation = () => mockLocation;
export const Link = ({ children, to }) => <a href={to}>{children}</a>;
export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ children }) => <div>{children}</div>;
export const Navigate = ({ to }) => <div>Navigating to {to}</div>;
