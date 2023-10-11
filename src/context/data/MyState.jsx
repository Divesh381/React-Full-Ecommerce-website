import React, { useEffect, useState } from 'react';
import MyContext from './MyContext';
import { QuerySnapshot, Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { FireDB } from '../../firebase/FirebaseConfig'

function MyState(props) {

    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false)
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark')
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            setMode('light')

            document.body.style.backgroundColor = "white";
        }

    }
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    })

    //***********add products****************** */
    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("Please fill fields ")
        }
        const productRef = collection(FireDB, "products")
        setLoading(true);
        try {
            await addDoc(productRef, products);
            toast.success("Add product successful")
            // toast.success("signup successful");
            setTimeout(() => {
                window.location = "/dashboard";
            }, 800)

            getProduct()
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //*********GET Products********** */
    const [product, setProduct] = useState([])

    const getProduct = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(FireDB, 'products'),
                orderBy('time'),

            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productsArray = [];

                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productsArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    // useEffect(() => {
    //     getProduct();
    // }, [])

    //*******  update product function********/
    const edithandle = (item) => {
        setProducts(item);
    }

    const updateProduct = async () => {
        setLoading(true);
        // console.log("hello update")
        try {

            await setDoc(doc(FireDB, 'products', products.id), products)
            toast.success('products update successfully')
            setTimeout(() => {

                window.location.href = '/dashboard'
            }, 800)
            getProduct();
            setLoading(false)


        } catch (error) {
            // console.log(error);
            setLoading(false)
        }
        setProducts('')
    }
    //  ############### deleteProduct ############//

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            // await deleteDoc(doc(FireDB, "products", item.id));
            await deleteDoc(doc(FireDB, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProduct();
            setLoading(false)

        }
        catch (error) {
            // console.log(error)
            setLoading(false);

        }
    }

    // ########### orderdata ##########/
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(FireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            // console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    // useEffect(() => {
    //     getProduct();
    //     getOrderData()

    // }, []);


    //// ######### user product ######//

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(FireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            // console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    useEffect(() => {
        getProduct();
        getOrderData();
        getUserData();
    }, []);
    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct, order, user,searchkey, setSearchkey,
            filterType, setFilterType,filterPrice, setFilterPrice, 
        }}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyState;
// 