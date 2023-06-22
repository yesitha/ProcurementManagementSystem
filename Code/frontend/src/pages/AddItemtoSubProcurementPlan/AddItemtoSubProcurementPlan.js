import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {
    Button,
    Container,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import {
    getItemNameList,
    getVendorList,
    pushNewItemSubProcurementPlan,
} from "../../services/DivisionHOD/deivisionHODServices";
import Styles from "./AddItemtoSubProcurementPlan.module.css";

function AddItemtoSubProcurementPlan() {
    const {division, selectedSubId} = useParams();
    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm();
    const [list, setList] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemDetails, setItemDetails] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedItemSpecs, setSelectedItemSpecs] = useState("");
    const [recommendedVendor, setRecommendedVendor] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemData = await getItemNameList();
                const itemNames = itemData.map((item) => item.itemName);
                setList(itemNames);
                setItemDetails(itemData);
            } catch (error) {
                console.log(error);
            }
            try {
                const vendorList = await getVendorList();
                console.log(vendorList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);


    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
        handleSelectItem(event.target.value);
    };

    const handleSelectItem = (itemName) => {
        const selectedItem = itemDetails.find((item) => item.itemName === itemName);
        if (selectedItem) {
            setSelectedItemId(selectedItem.itemId);
            setSelectedItemSpecs(selectedItem.specification);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            alert("Please select a PDF file.");
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const onSubmit = async (data) => {
        const {expectedDeliveryDate, estimatedBudget, quantity} = data;
        const dateParts = expectedDeliveryDate.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T00:00:00Z`;
        const formData = {
            SppId: selectedSubId,
            ItemId: selectedItemId,
            RecomendedVendor: recommendedVendor,
            expectedDeliveryDate: formattedDate,
            estimatedBudget: parseInt(estimatedBudget),
            quantity: parseInt(quantity),
        };

        try {
            console.log("formData: " + JSON.stringify(formData));
            await pushNewItemSubProcurementPlan(formData, selectedFile);

            // Handle success or navigate to a different page
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };
    return (
        <div style={{display: "flex", overflow: "hidden"}}>
            <Container
                sx={{
                    ml: {xs: "20px", sm: "20px", md: "20px", lg: "21px", xl: "22px"},
                }}
            >
                <div className="upperSection">
                    <div className={Styles.headTitle}>
                        <RouterLink to={`/SubProcurmentPlan/${selectedSubId}`}>
                            <IconButton
                                sx={{pl: "15px", height: "34px", width: "34px", mt: 3.7}}
                            >
                                <ArrowBackIosIcon sx={{color: "#ffffff"}}/>
                            </IconButton>
                        </RouterLink>
                        <h1 className={Styles.headTitleName}>
                            [ Add / Modify / Modify Rejected ] Item to Sub Procurement Plan{" "}
                        </h1>
                    </div>
                </div>
                <div className="bottomSection">
                    <Paper
                        elevation={6}
                        sx={{
                            pl: 5,
                            pr: {lg: 5, md: 5},
                            ml: {lg: 2.5, md: 1},
                            mr: 2,
                            borderRadius: 10,
                        }}
                    >
                        <div>
                            <div className={Styles.bodyBlueContainerMain}>
                                <div className={Styles.bodyBlueContainer}>
                                    <h3>Sub Procurement ID : {selectedSubId}</h3>
                                    <h3>Division: {division}</h3>
                                </div>
                            </div>

                            <div className={Styles.bodyContainer}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={Styles.bodyLeft}>
                                        <Typography sx={{mt: 2, mb: 1}}>Item Name</Typography>
                                        {list !== null && (
                                            <SelectDropDown
                                                name="itemName"
                                                register={register}
                                                list={list}
                                                onChange={handleItemNameChange}
                                            />
                                        )}

                                        <Typography sx={{mt: 1}}>Item Id</Typography>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="itemId"
                                            name="itemId"
                                            value={selectedItemId}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="quantity"
                                            label="Quantity"
                                            name="quantity"
                                            type="number"
                                            {...register("quantity", {
                                                required: {
                                                    value: true,
                                                    message: "Quantity is required"
                                                }
                                            }, {
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Quantity should be a number"
                                                }
                                            }, {min: {value: 1, message: "Quantity should be greater than 0"}})}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="estimatedBudget"
                                            label="Estimated Budget"
                                            name="estimatedBudget"
                                            type="number"
                                            {...register("estimatedBudget", {
                                                required: {
                                                    value: true,
                                                    message: "Estimated Budget is required"
                                                }
                                            }, {
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Estimated Budget should be a number"
                                                }
                                            }, {
                                                min: {
                                                    value: 1,
                                                    message: "Estimated Budget should be greater than 0"
                                                }
                                            })}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="recommendedVendor"
                                            label="Recommended Vendor"
                                            name="recommendedVendor"
                                            {...register("recommendedVendor", {
                                                pattern: {
                                                    value: /^[a-zA-Z ]+$/i,
                                                    message: "Recommended Vendor should be a name"
                                                }
                                            })}
                                            autoComplete="email"
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="expectedDeliveryDate"
                                            label="Expected date"
                                            name="expectedDeliveryDate"
                                            {...register("expectedDeliveryDate")}
                                        />
                                    </div>
                                    <div className={Styles.bodyRight}>
                                        <Typography sx={{mt: 2, mb: 2}}>
                                            Item Specifications
                                        </Typography>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            rows={8}
                                            multiline
                                            id="specification"
                                            name="specification"
                                            value={selectedItemSpecs}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <div>
                                            <Typography sx={{mt: 2}}>Evidence of Authorization</Typography>

                                            <br/>
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                accept="application/pdf"
                                                ref={fileInputRef}
                                                style={{display: "none"}}
                                                onChange={handleFileChange}
                                            />
                                            <Button
                                                variant="outlined"
                                                onClick={handleBrowseClick}
                                            >
                                                Browse
                                            </Button>
                                            {selectedFile && (
                                                <Typography sx={{mt: 1}}>
                                                    {selectedFile.name}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className={Styles.bottomContainer}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                borderRadius: 10,
                                                height: "50px",
                                                textTransform: "none",
                                                fontSize: "20px",
                                                mt: 3,
                                                mb: 2,
                                            }}
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                </form>
                                <DevTool control={control} placement={"top-right"}/>
                            </div>
                        </div>
                    </Paper>
                </div>
            </Container>
        </div>
    );
}

export default AddItemtoSubProcurementPlan;
