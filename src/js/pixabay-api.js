import axios from 'axios';

export const querySearch = async (searchValue, page) => {
  return axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '48370446-8dcf2f9524038c25db09fe77e',
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });

  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   // console.log(
  //   //   response.json().then(res => {
  //   //     console.log(res.hits);
  //   //   })
  //   // );
  //   return response.json();
  // });
};

// export const querySearch = searchValue => {
//   return fetch(
//     `https://pixabay.com/api/?key=48370446-8dcf2f9524038c25db09fe77e&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=30`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     // console.log(
//     //   response.json().then(res => {
//     //     console.log(res.hits);
//     //   })
//     // );
//     return response.json();
//   });
// };
