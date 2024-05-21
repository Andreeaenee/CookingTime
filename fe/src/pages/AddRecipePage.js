import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import { Link } from 'react-router-dom';

const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [userId, setUserId] = useState(2); // Example user ID
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('steps', steps);
    formData.append('user_id', userId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8080/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Recipe added successfully');
        // Redirect to My Recipes page or clear form
      } else {
        console.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Wrapper>
      <div style={styles.container}>
        <h1 style={styles.heading}>Add Recipe</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Steps:</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Save</button>
          <Link to="/my-recipes" style={styles.link}>Go to My Recipes</Link>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddRecipePage;

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    height: '150px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    display: 'block',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#007bff',
    textDecoration: 'none',
  },
};
