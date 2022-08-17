import { toast } from 'react-toastify';

const KEY = '28152174-c362e84e874961aded494c5b6';
const errorMessage = () => toast.error('Oops... we didn`t find anything');

export class ImageService {
 getImages = (input, page) => {
   return(
    fetch(
        `https://pixabay.com/api/?q=${input}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      ).then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(errorMessage()));
      })
   ) 
  };
}
