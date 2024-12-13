import ReactDOM from "react-dom/client";
import Loading from "@/component/Loading";

let count = 0;

export const showFullScreenLoad = () => {
    if (count === 0) {
        const dom = document.createElement("div");
        dom.setAttribute("id", "loading");
        document.body.appendChild(dom);

        const root = ReactDOM.createRoot(dom);
        root.render(<Loading />);
    }
    count++;
}

export const hideFullScreenLoading = () => {
    if (count <= 0) return;
    count--;
    if (count === 0) {
        document.body.removeChild(document.getElementById("loading") as HTMLElement);
    }
};

