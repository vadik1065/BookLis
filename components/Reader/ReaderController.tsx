import React, { useEffect, useState } from 'react';
import Epub, { Book } from 'epubjs';
import './css/reader.module.css'

const BookReader: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);

  const handleFileRead = (file?: File) => {
    const reader = Epub('/static/filesBook/Leto-v-pionerskom-galstuke.epub');
    setBook(reader);
  };

  useEffect(() => {
    handleFileRead()
  }, [])

  useEffect(() => {
    if (book) {
      var rendition = book.renderTo("area-for-book");
      rendition.display();
    }
  }, [book])

  return (
    <div>
      {/* <input type="file" onChange={e => handleFileRead(e.target.files[0])} /> */}
      {book && (
        <div>
          <h2>Book:</h2>
          <div id='area-for-book' />
          {/* <p>{book.}</p> */}
        </div>
      )}
    </div>
  );
};

export default BookReader;
