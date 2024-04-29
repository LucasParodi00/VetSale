import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";



const InputBuscador = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#6486ff',
    borderRadius: '1.5rem',
  },
  '& .MuiInputBase-input': { // Principal
    borderRadius: '1.5rem',
    width: '40rem',
    height: '1.5rem'
  },
  '& label.Mui-focused': {
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: '1.5rem',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  '& label.css-1weh54j-MuiFormLabel-root-MuiInputLabel-root': { // letra chica del label
    color: "#000",
    fontWeight: 'bold',
    fontSize: '2rem'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',

  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
      borderRadius: '1.5rem',
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
      color: '#FFF'
    },
  },
});

export const Buscador = ({ parametro, onChange }) => {

  return (
    <InputBuscador
      label={
        <>
          <Search style={{ verticalAlign: 'middle' }} /> Buscar {parametro}
        </>
      }
      variant="outlined"
      onChange={onChange}
    />
  );
};

