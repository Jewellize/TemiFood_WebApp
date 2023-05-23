import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FoodCard from "./components/FoodCard";
import { Input } from "@material-tailwind/react";
import logo from "./public/Temi-logo2.jpg";

function App() {
  // get data
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [openAddData, setAddData] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  //Date
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  // console.log(file);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(formData.get("image"));
    formData.append("name", name);
    formData.append("price", price);
    axios
      .post("https://temi-food-backend.vercel.app/uploads", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState([]);
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "https://temi-food-backend.vercel.app/alldata"
      );
      setData(res.data);
      setFilterData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //file
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addQty = (index) => {
    let newCart = [...cart];
    newCart[index] = { ...newCart[index], qty: (newCart[index].qty += 1) };
    setCart(newCart);
  };

  const removeQty = (index) => {
    let newCart = [...cart];
    if (newCart[index].qty - 1 > 0) {
      newCart[index] = { ...newCart[index], qty: (newCart[index].qty -= 1) };
      setCart(newCart);
    } else {
      newCart = newCart.filter((x) => x.id != newCart[index].id);
      setCart(newCart);
    }
  };

  const addToCart = (product) => {
    let index = findCartIndex(product);
    if (index === -1) {
      let newProduct = { qty: 1, ...product };
      setCart([newProduct, ...cart]);
    } else {
      let newCart = [...cart];
      newCart[index] = { ...newCart[index], qty: (newCart[index].qty += 1) };
      setCart(newCart);
    }
  };

  const findCartIndex = (product) => {
    return cart.findIndex((p) => p.id === product.id);
  };

  const filterBySearch = (event) => {
    let filterInput = event.target.value;
    let cartFilter = data.filter((item) => {
      return item.name.includes(filterInput);
    });
    setFilterData(cartFilter);
    // console.log({ cartFilter });
  };

  //check data
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {/* no-print-area */}
      <div className="hide-print bg-blue-gray-50 flex flex-row h-screen antialiased text-blue-gray-800">
        {/* left-navbar */}
        <div className="flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4 ">
          <div className="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-cyan-500 rounded-3xl">
            <a
              href="#"
              className="flex items-center justify-center h-12 w-12 bg-cyan-50 text-cyan-700 rounded-full"
            >
              <img className="rounded-2xl" src={logo}></img>
            </a>
            <ul className="flex flex-col space-y-2 mt-12">
              <li>
                <a href="#" className="flex items-center">
                  <span className="flex items-center justify-center h-12 w-12 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li>
                <div
                  className="flex items-center"
                  onClick={() => {
                    setAddData(!openAddData);
                  }}
                >
                  <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
        {/* page-content */}
        <div className="flex-grow flex">
          {/* store-menu */}
          <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
            <div className="flex px-2 flex-row relative">
              <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                placeholder="Search menu ..."
                onChange={filterBySearch}
              />
            </div>
            <div className="h-full overflow-hidden mt-4">
              <div className="h-full overflow-y-auto px-2">
                <div>
                  <div className="grid grid-cols-4 gap-4 ">
                    {filterData.map((val, key) => {
                      return (
                        <div
                          key={key}
                          className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg"
                          title={val.name}
                          onClick={() => {
                            addToCart(val);
                          }}
                        >
                          <FoodCard
                            src={
                              "https://temi-food-backend.vercel.app/images/" +
                              val.image
                            }
                            name={val.name}
                            price={val.price + " บาท"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end-store-menu */}

          {/* right-sidebar */}
          <div className="w-5/12 flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
            <div className="bg-white rounded-3xl flex flex-col h-full shadow">
              <div className="flex-1 flex flex-col overflow-auto">
                <div className="h-16 text-center flex justify-center">
                  <div className="pl-8 text-left text-lg py-4 relative">
                    {/* cart-icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                      <div>
                        {cart.reduce((acc, o) => acc + parseInt(o.qty), 0)}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow px-8 text-right text-lg py-4 relative">
                    {/* trash-button */}
                    <button
                      onClick={() => {
                        setCart([]);
                      }}
                      className="text-blue-gray-300 hover:text-pink-500 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* add-item-to-cart */}
                <div className="flex-1 w-full px-4 overflow-auto">
                  <div>
                    {cart.map((item, index) => (
                      <div
                        className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center"
                        key={index}
                      >
                        <img
                          src={"http://localhost:3000/images/" + item.image}
                          alt=""
                          className="rounded-lg h-10 w-10 bg-white shadow mr-2"
                        ></img>
                        <div className="flex-grow">
                          <h5 className="text-sm">{item.name}</h5>
                          <p className="text-xs block">
                            {item.price * item.qty}
                          </p>
                        </div>
                        <div className="py-1">
                          <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                            <button
                              onClick={() => {
                                removeQty(index);
                              }}
                              className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-3 inline-block"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <div className="bg-white rounded-lg flex justify-center py-2  shadow focus:outline-none focus:shadow-lg text-sm">
                              {item.qty}
                            </div>
                            <button
                              onClick={() => {
                                addQty(index);
                              }}
                              className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-3 inline-block"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* payment */}
              <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
                <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                  <div>รวม</div>
                  <div className="text-right w-full">
                    {cart.reduce(
                      (acc, o) => acc + parseInt(o.qty) * o.price,
                      0
                    )}{" "}
                    บาท
                  </div>
                </div>
                <div>
                  <button
                    className="text-white rounded-2xl text-lg w-full py-3 bg-cyan-500 hover:bg-cyan-600 "
                    onClick={() => {
                      setOpenPayment(!openPayment);
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24 ${
              openPayment || "hidden"
            }`}
          >
            <div
              className="fixed glass w-full h-screen left-0 top-0 z-0"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="transition ease-in duration-100"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
            ></div>
            <div
              className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="opacity-0 transform scale-90"
              x-transition:enter-end="opacity-100 transform scale-100"
              x-transition:leave="transition ease-in duration-100"
              x-transition:leave-start="opacity-100 transform scale-100"
              x-transition:leave-end="opacity-0 transform scale-90"
            >
              <div
                id="receipt-content"
                className="text-left w-full text-sm p-6 overflow-auto"
              >
                <div className="text-center">
                  <h2 className="text-xl font-semibold">Temi Food</h2>
                  <p>ใบเสร็จค่าอาหาร</p>
                </div>
                <div className="flex mt-4 text-xs">
                  <div className="flex-grow">
                    <span x-text="receiptNo"></span>
                  </div>
                  {currentDate}
                </div>
                <hr className="my-2"></hr>
                <div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="py-1 w-1/12 text-center">#</th>
                        <th className="py-1 text-left">Item</th>
                        <th className="py-1 w-2/12 text-center">Quantity</th>
                        <th className="py-1 w-3/12 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((payData, index) => {
                        return (
                          <tr key={index}>
                            <td className="py-2 text-center">{index + 1}</td>
                            <td className="py-2 text-left">
                              <span>{payData.name}</span>
                              <br />
                              <small>{payData.price}</small>
                            </td>
                            <td className="py-2 text-center">{payData.qty}</td>
                            <td className="py-2 text-right">
                              {payData.qty * payData.price}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <hr className="my-2"></hr>
                <div>
                  <div className="flex font-semibold">
                    <div className="flex-grow">รวม</div>
                    <div x-text="priceFormat(getTotalPrice())">
                      {cart.reduce(
                        (acc, o) => acc + parseInt(o.qty) * o.price,
                        0
                      )}{" "}
                      บาท
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between w-full">
                <button
                  className="border border-cyan-500 text-cyan-500 text-lg px-4 py-3 rounded-2xl focus:outline-none w-1/3"
                  onClick={() => {
                    setOpenPayment(!openPayment);
                  }}
                >
                  CANCEL
                </button>
                <button
                  className="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl focus:outline-none w-1/3"
                  x-on:click="printAndProceed()"
                >
                  PROCEED
                </button>
              </div>
            </div>
          </div>

          {/* add-item */}
          <div
            className={`fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24 ${
              openAddData || "hidden"
            }`}
          >
            <div
              className="fixed glass w-full h-screen left-0 top-0 z-0"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="opacity-0"
              x-transition:enter-end="opacity-100"
              x-transition:leave="transition ease-in duration-100"
              x-transition:leave-start="opacity-100"
              x-transition:leave-end="opacity-0"
            ></div>
            <div
              className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10"
              x-transition:enter="transition ease-out duration-100"
              x-transition:enter-start="opacity-0 transform scale-90"
              x-transition:enter-end="opacity-100 transform scale-100"
              x-transition:leave="transition ease-in duration-100"
              x-transition:leave-start="opacity-100 transform scale-100"
              x-transition:leave-end="opacity-0 transform scale-90"
            >
              <div className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">Upload Menu</h2>
                </div>
                <hr className="my-2"></hr>
                <div className="flex justify-center">
                  <div className="w-4/5">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Input
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder="Name"
                        ></Input>
                      </div>
                      <div>
                        <Input
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                          placeholder="Price"
                        ></Input>
                      </div>
                      {/* <div>price</div> */}
                      <br></br>
                      <div className="container">
                        <input type="file" onChange={handleFile} />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-2"></hr>
                <div>
                  <div className="flex font-semibold">
                    <div className="flex-grow"></div>
                    <div>
                      {/* {cart.reduce(
                        (acc, o) => acc + parseInt(o.qty) * o.price,
                        0
                      )}{" "}
                      บาท */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between w-full">
                <button
                  className="border border-cyan-500 text-cyan-500 text-lg px-4 py-3 rounded-2xl focus:outline-none w-1/3"
                  onClick={() => {
                    setAddData(!openAddData);
                  }}
                >
                  CANCEL
                </button>
                <button
                  className="bg-cyan-500 text-white text-lg px-4 py-3 rounded-2xl focus:outline-none w-1/3"
                  onClick={handleUpload}
                >
                  UPLOAD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
