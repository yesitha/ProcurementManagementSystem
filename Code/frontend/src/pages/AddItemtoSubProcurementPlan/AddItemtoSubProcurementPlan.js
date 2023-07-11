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
import {Link as RouterLink} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectDropDown from "../../components/SelectDropDown/SelectDropDown";
import DonePopup from "../../components/Popups/DonePopup/DonePopup";
import { Link as Routerlink, useParams } from "react-router-dom";
import {
    getItemNameList,
    getVendorList,
    pushNewItemSubProcurementPlan,
} from "../../services/DivisionHOD/deivisionHODServices";
import Styles from "./AddItemtoSubProcurementPlan.module.css";

function AddItemtoSubProcurementPlan() {
    const {division, selectedSubId} = useParams();
    const {
        getValues,
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onTouched"});
    const [list, setList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
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
                const vendorNames = vendorList.map((vendor) => vendor.firstName+" "+vendor.lastName);
                setVendorList(vendorNames);
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

    const handleVendorChange = (event) => {
        setRecommendedVendor(event.target.value);
        console.log(recommendedVendor)
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


    const onSubmit = async () => {
        const data=getValues();
        const {expectedDeliveryDate, estimatedBudget, quantity} = data;

        const dateParts = expectedDeliveryDate.split("-");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}Z`;
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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{display: "flex", overflow: "hidden"}}>
            <Container sx={{ml: {xs: "30px", sm: "30px", md: "30px", lg: "31px", xl: "32px"},}}>
                <div>
                    <div className={Styles.headTitle}>
                        <RouterLink to={`/SubProcurmentPlan/${selectedSubId}`}>
                            <IconButton
                                sx={{pl: "15px", height: "34px", width: "34px", mt: 3.7}}
                            >
                                <ArrowBackIosIcon sx={{color: "#ffffff"}}/>
                            </IconButton>
                        </RouterLink>
                        <h1 className={Styles.headTitleName}>
                            Add Item to Sub Procurement Plan{" "}
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
                                        <Typography sx={{mt: 2, mb: 1}}>Recommended Vendor</Typography>
                                        {list !== null && (
                                            <SelectDropDown
                                                name="recommendedVendor"
                                                register={register}
                                                list={vendorList}
                                                onChange={handleVendorChange}
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
                                            {...register("quantity", {
                                                required: "Quantity Cant be Empty!",
                                                min: {
                                                    value: 1,
                                                    message: "Quantity should be greater than 0"},
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Quantity should be a  number",
                                                },
                                            })}
                                        />
                                        <p className="error">{errors.quantity?.message}</p>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="estimatedBudget"
                                            label="Estimated Budget"
                                            name="estimatedBudget"
                                            {...register("estimatedBudget", {
                                                required: "Estimated budget Cant be Empty!",
                                                min: {
                                                    value: 1,
                                                    message: "Estimated budget should be greater than 0"},
                                                pattern: {
                                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                                    message: "Estimated budget should be a  number",
                                                },

                                            })}
                                        />
                                        <p className="error">{errors.estimatedBudget?.message}</p>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="expectedDeliveryDate"
                                            label="Expected date"
                                            name="expectedDeliveryDate"
                                            {...register("expectedDeliveryDate", {
                                                required: 'Date is required',
                                                pattern: {
                                                    value: /^\d{4}-\d{2}-\d{2}$/,
                                                    message: 'Invalid date format (yyyy-mm-dd)',
                                                }})}
                                        />
                                        <p className="error">{errors.expectedDeliveryDate?.message}</p>

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
                                        <div className={Styles.addButton}>
                                            <div onClick={onSubmit}>
                                                <DonePopup
                                                    text={"Successfully Added"}
                                                    title={"Add Item to Sub Procurement Plan"}
                                                    styles={{
                                                        mb: "10px",
                                                    }}
                                                    onC
                                                />
                                            </div>

                                            <Routerlink to={"/add-new-item"}>
                                                <Button className={Styles.belowButton} variant="contained">
                                                    Add a new Item to system
                                                </Button>
                                            </Routerlink>
                                        </div>
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
