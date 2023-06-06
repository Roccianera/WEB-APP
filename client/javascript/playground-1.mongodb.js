
use('test');

// Insert a few documents into the sales collection.
db.getCollection('artistsdocuments').insertMany([
    {
        'id': 1,
        'firstName': 'John',
        'lastName': 'Doe',
        'specialist': 'cantante',
        'email': 'johndoe@example.com',
        'password': 'mypassword',
        'chachet': 100,
        'phone': '1234567890',
        'genre': 'male',
        'vocal_registrer': 'tenor',
        'img_src': 'https://i.stack.imgur.com/hYLL1.png',
        'strumensts': ['guitar', 'piano']
      },
      {
        'id': 2,
        'firstName': 'Jane',
        'lastName': 'Smith',
        'specialist': 'strumentista',
        'email': 'janesmith@example.com',
        'password': 'anotherpassword',
        'chachet': 150,
        'phone': '9876543210',
        'genre': 'female',
        'vocal_registrer': 'alto',
        'img_src': 'https://example.com/profile2.jpg',
        'strumensts': ['violin', 'flute']
      },
      {
        'id': 3,
        'firstName': 'John',
        'lastName': 'Doe',
        'specialist': 'cantante',
        'email': 'johndoe@example.com',
        'password': 'mypassword',
        'chachet': 100,
        'phone': '1234567890',
        'genre': 'male',
        'vocal_registrer': 'tenor',
        'img_src': 'https://example.com/profile1.jpg',
        'strumensts': ['guitar', 'piano']
      },
      {
        'id': 4,
        'firstName': 'Jane',
        'lastName': 'Smith',
        'specialist': 'strumentista',
        'email': 'janesmith@example.com',
        'password': 'anotherpassword',
        'chachet': 150,
        'phone': '9876543210',
        'genre': 'female',
        'vocal_registrer': 'alto',
        'img_src': 'https://example.com/profile2.jpg',
        'strumensts': ['violin', 'flute']
      }





]);
