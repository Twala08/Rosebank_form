import React, { useRef, useState } from 'react';
import AppBar from '../Components/AppBar';
import MediaCard from '../Components/card';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import SignatureCanvas from 'react-signature-canvas';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';

// Customizing the theme
const theme = createTheme({
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        borderColor: '#D81730',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D81730',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#D81730',
                    '&.Mui-checked': {
                        color: '#D81730',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#D81730',
                    '&.Mui-checked': {
                        color: '#D81730',
                    },
                },
            },
        },
    },
});

const provinceOptions = {
    Gauteng: ['Jozi', 'PTA HO', 'PTA Trevenna Campus'],
    Limpopo: ['Thohoyandou', 'Polokwane'],
    Mpuma: ['Nelspruit'],
    'North West': ['Rustenburg', 'Maf Town'],
    'Northern Cape': ['Kimberly'],
    FreeState: ['Bloemfontein', 'Phuthaditjaba'],
    KZN: ['Pietermaritzburg', 'Durban'],
    'Eastern Cape': ['Mtata', 'Bisho', 'Gqeberha'],
    'Western Cape': ['CPT'],
};

function Home() {
    const mainFormRef = useRef(null);
    const signCanvasRef = useRef(null);

    const [formData, setFormData] = useState({
        disclaimer: '',
        
        email: '',
        consentID: '',
        phone: '',
        challenges: '',
        signatureUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const isValid = validateForm();
    
        if (isValid) {
            if (signCanvasRef.current) {
                const signatureUrl = signCanvasRef.current.getTrimmedCanvas().toDataURL();
                console.log('Signature URL:', signatureUrl);
    
                const finalFormData = new FormData();
    
                Object.entries({ ...formData, signatureUrl }).forEach(([key, value]) => {
                    finalFormData.append(key, value);
                });
    
                console.log('Form Data:', finalFormData);
    
                try {
                    const response = await fetch('https://script.google.com/macros/s/AKfycbxbKGnxR5qj9pr8C6ESZE6J4FginTbY-VWwe3ZADEgrSpXErtqETbc3KLOLbEY1OKgdeA/exec', {
                        method: 'POST',
                        body: finalFormData
                    });
    
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('Form submitted successfully:', responseData);
                        Swal.fire('Success', 'Form submitted successfully!', 'success');
                    } else {
                        console.error('Failed to submit form:', response.statusText);
                        Swal.fire('Error', 'Failed to submit form', 'error');
                    }
                } catch (error) {
                    console.error('An error occurred while submitting the form:', error);
                    Swal.fire('Error', 'An error occurred while submitting the form', 'error');
                }
            }
        }
    };
    
    const validateForm = () => {
        const {
            course,
            datacollection,
            
            challenges,
            
        } = formData;
        
    
        if (!datacollection) {
            Swal.fire({
                title: 'Error',
                text: 'Provide Data collection method',
                icon: 'error',
                customClass: {
                    confirmButton: 'swal-confirm-button', // Custom class for the confirmation button
                },
                buttonsStyling: false, // Disable default styling to use custom styles
                confirmButtonColor: '#4CAF50', // Background color for the confirmation button
            });
            return false;
        }
    

        if (!course) {
            Swal.fire({
                title: 'Error',
                text: 'Please provide a disclaimer',
                icon: 'error',
                customClass: {
                    confirmButton: 'swal-confirm-button', // Custom class for the confirmation button
                },
                buttonsStyling: false, // Disable default styling to use custom styles
                confirmButtonColor: '#4CAF50', // Background color for the confirmation button
            });
            return false;
        }
        
       
        if (signCanvasRef.current.isEmpty()) {
            Swal.fire('Error', 'Please Sign', 'error');
            return false;
        }
    
        return true;
    };
    


    return (
        <ThemeProvider theme={theme}>
        <React.Fragment>
            <AppBar />
            <MediaCard/>
            <Paper
                ref={mainFormRef}
                sx={{
                    p: 2,
                    margin: '5%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: '#FFFFFF',
                }}
            >
               
               <FormControl sx={{ width: '50%', margin: 'auto', marginBottom: '4px' }}>
                    <InputLabel id="Event-label">Data collection method</InputLabel>
                    <Select
                        labelId="Event-label"
                        id="Event-required"
                        value={formData.datacollection}
                        name="eventType"
                        label="Event Type *"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>- Choose -</em></MenuItem>
                        <MenuItem value="Email">Email</MenuItem>
                        <MenuItem value="SMS">SMS</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
               <FormControl sx={{ width: '50%', margin: 'auto', marginBottom: '4px' }}>
                    <InputLabel id="Event-label">Course Name</InputLabel>
                    <Select
                        labelId="Event-label"
                        id="Event-required"
                        value={formData.course}
                        name="eventType"
                        label="Event Type *"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>- Choose -</em></MenuItem>
                        <MenuItem value="IIE Diploma in IT in Software Development">IIE Diploma in IT in Software Development</MenuItem>
                        <MenuItem value="IIE Diploma in IT in Network Management">IIE Diploma in IT in Network Management</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
                
                <FormControl sx={{ width: '50%', margin: 'auto', marginBottom: '2px' }}>
                    <FormLabel id="popi_act_label">
                        <Typography sx={{ marginTop: '5%' }} gutterBottom>
                        On a scale of 1-10, how satisfied were you with the lecturer's approach on this module.
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="popi_act_label"
                        defaultValue=""
                        name="disclaimer"
                        onChange={handleChange}
                    >
                        <FormGroup row sx={{ justifyContent: 'center', gap: 1 }}>
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={3} control={<Radio />} label="3" />
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                        <FormControlLabel value={5} control={<Radio />} label="5" />
                        <FormControlLabel value={6} control={<Radio />} label="6" />
                        <FormControlLabel value={7} control={<Radio />} label="7" />
                        <FormControlLabel value={8} control={<Radio />} label="8" />
                        <FormControlLabel value={9} control={<Radio />} label="9" />
                        <FormControlLabel value={10} control={<Radio />} label="10" />
                        </FormGroup>
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ width: '50%', margin: 'auto', marginBottom: '2px' }}>
                    <FormLabel id="popi_act_label">
                        <Typography sx={{ marginTop: '5%' }} gutterBottom>
                        On a scale of 1-10   how satisfied were you with me  module  tutorials offered
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="popi_act_label"
                        defaultValue=""
                        name="disclaimer"
                        onChange={handleChange}
                    >
                        <FormGroup row sx={{ justifyContent: 'center', gap: 1 }}>
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={3} control={<Radio />} label="3" />
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                        <FormControlLabel value={5} control={<Radio />} label="5" />
                        <FormControlLabel value={6} control={<Radio />} label="6" />
                        <FormControlLabel value={7} control={<Radio />} label="7" />
                        <FormControlLabel value={8} control={<Radio />} label="8" />
                        <FormControlLabel value={9} control={<Radio />} label="9" />
                        <FormControlLabel value={10} control={<Radio />} label="10" />
                        </FormGroup>
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ width: '50%', margin: 'auto', marginBottom: '2px' }}>
                    <FormLabel id="popi_act_label">
                        <Typography sx={{ marginTop: '5%' }} gutterBottom>
                        On a scale of 1-10   how satisfied were you with the the assessments given on this module ?
                        </Typography>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="popi_act_label"
                        defaultValue=""
                        name="disclaimer"
                        onChange={handleChange}
                    >
                        <FormGroup row sx={{ justifyContent: 'center', gap: 1 }}>
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={3} control={<Radio />} label="3" />
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                        <FormControlLabel value={5} control={<Radio />} label="5" />
                        <FormControlLabel value={6} control={<Radio />} label="6" />
                        <FormControlLabel value={7} control={<Radio />} label="7" />
                        <FormControlLabel value={8} control={<Radio />} label="8" />
                        <FormControlLabel value={9} control={<Radio />} label="9" />
                        <FormControlLabel value={10} control={<Radio />} label="10" />
                        </FormGroup>
                    </RadioGroup>
                </FormControl>

                <Typography sx={{ marginTop: '5%' }} gutterBottom>
                What aspects of the course did you find most challenging, and how could these be improved?
                </Typography>
                <TextField
                        sx={{ width: '50%', margin: 'auto', marginBottom: '6px', marginTop: '2%' }}
                        helperText="Required"
                        id="outlined-multiline-static"
                        label="Your Answer "
                        multiline
                        rows={4}
                        value={formData.challenges}
                        onChange={handleChange}
                    />

                <div style={{ position: 'relative', marginTop: '1rem' }}>
                <div style={{ border: 'solid #D81730 2px', width:'100%', height: 200, position: 'relative' }}>
                        <SignatureCanvas
                            penColor='#D81730'
                            canvasProps={{ width: 700, height: 200, className: 'sigCanvas' }}
                            ref={signCanvasRef}
                        />
                        <Button
                            size="small"
                            onClick={() => signCanvasRef.current.clear()} // Clear the signature when clicked
                            style={{ position: 'absolute', bottom: 0, right: 0, color: 'grey' }}
                            sx={{ '&:hover': { color: '#DF6E46' } }}
                        >
                            CLEAR
                        </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', width: '100%' }}>
                        <Link style={{ flex: 1, textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#D81730',
                                    color: '#FFFFFF',
                                    width: '40%',
                                    marginLeft: '5px',
                                    '&:hover': { backgroundColor: '#D81730' }
                                }}
                                endIcon={<SendIcon />}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Link>
                    </div>
                </div>
            </Paper>
        </React.Fragment>
        </ThemeProvider>
    );
}


export default Home;