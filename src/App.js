import { Provider } from "react-redux";
import { store } from "./redux/index";
import Router from "./pages/router";

const App = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
