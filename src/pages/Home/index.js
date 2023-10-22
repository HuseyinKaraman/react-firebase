import { Box, Button, Container } from "@chakra-ui/react";
// import { addProduct, deleteProduct, useProductsListener } from "../../config/firebase";
import { storage, useProductsListener } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/productSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

const Home = () => {
    useProductsListener();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const [url, setUrl] = useState(null);
    const [imageRef, setimageRef] = useState(null);

    useEffect(() => {
        if (imageRef) {
            getDownloadURL(imageRef)
                .then((url) => {
                    setUrl(url);
                })
                .catch((err) => console.log(err));
        }
    }, [imageRef]);

    return (
        <Container>
            <div className="my-5">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        uploadBytes(ref(storage, "photos/" + file.name), file).then((data) => {
                            setimageRef(data.ref);
                        });
                    }}
                />
            </div>

            {url && <img src={url} className="w-96 my-4" alt="img" />}

            <Button className="my-2" onClick={() => dispatch(addProduct())}>
                add Product
            </Button>
            <Box>
                {products?.map((product) => (
                    <div key={product.id} className="my-8">
                        <h2 className="font-semibold">{product.name}</h2>
                        <h2 className="font-semibold">{product.price}</h2>
                        <h2 className="font-semibold">{product.description}</h2>
                        <Button onClick={() => dispatch(deleteProduct(product.id))}>deleteProduct</Button>
                    </div>
                ))}
            </Box>
        </Container>
    );
};

export default Home;
