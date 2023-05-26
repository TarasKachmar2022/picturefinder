import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Layout from 'components/Layout';
import fetchApi from 'components/ApiService';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import LoadMoreBtn from 'components/Button';
import Loader from 'components/Loader';

// class App extends Component {
// state = {
//   searchName: '',
//   page: 1,
//   items: [],
//   pageQuantity: 0,
//   error: null,
//   loading: false,
// };

// async componentDidUpdate(_, prevState) {
//   const { page, searchName } = this.state;

//   if (prevState.page !== page || prevState.searchName !== searchName) {
//     this.setState({ loading: true });
//     try {
//       const response = await fetchApi(searchName, page);

//       if (response.hits.length === 0) {
//         throw new Error();
//       }
//       this.setState(prevState => ({
//         items: [...prevState.items, ...response.hits],
//         pageQuantity: Math.ceil(response.totalHits / response.perPage),
//       }));
//     } catch (error) {
//       this.setState({
//         error: toast.error('Щось пішло не так... Спробуйте ще раз!'),
//       });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }
// }

// formHandlerSubmit = searchName => {
//   this.setState({ searchName, page: 1, items: [] });
// };

// onChangePageNumber = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

// render() {
// const { loading, error, page, pageQuantity, items: images } = this.state;
// return (
//   <Layout>
//     <Searchbar onSubmit={this.formHandlerSubmit} />
//     {error !== null && <Toaster position="top-right" />}
//     <ImageGallery items={images} />
//     {page < pageQuantity && (
//       <LoadMoreBtn addPage={this.onChangePageNumber} />
//     )}
//     {loading && <Loader />}
//   </Layout>
// );
// }
// }

// export default App;

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchName === '') return;

    const GetApi = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(searchName, page);

        if (response.hits.length === 0) {
          throw new Error();
        }
        setItems(prevState => [...prevState, ...response.hits]);
        setPageQuantity(Math.ceil(response.totalHits / response.perPage));
      } catch (error) {
        setError(toast.error('Щось пішло не так... Спробуйте ще раз!'));
      } finally {
        setLoading(false);
      }
    };
    GetApi();
  }, [searchName, page]);

  const formHandlerSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setItems([]);
  };

  const onChangePageNumber = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={formHandlerSubmit} />
      {error !== null && <Toaster position="top-right" />}
      <ImageGallery items={items} />
      {page < pageQuantity && <LoadMoreBtn addPage={onChangePageNumber} />}
      {loading && <Loader />}
    </Layout>
  );
};

export default App;
