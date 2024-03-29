import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Addvehiclewithparams = () => {
    const [data, setData] = useState([]);
    const [selectedScenario, setSelectedSccenario] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [vehicleSpeed, setVehicleSpeed] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [direction, setDirection] = useState("Towards");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const FetchData = async() => {
            const response = await axios.get('http://localhost:3030/simulation');
            setData(response.data);

            if(response.data.length === 0){
                alert("create a scenario");
            }
            setSelectedSccenario(id);
        }
        FetchData();
    },[])
    
    const AddData = async() => {
        let obj;
        data.forEach((scenario) => {
            if(scenario.id == selectedScenario){
                obj = scenario;
            }
        })
        let limitX = x;
        let limitY = y;
        if(limitX  > 1160){
            limitX  = 1160;
        }
        if(limitX  < 0){
            limitX  = 0;
        }
        if(limitY > 1160){
            limitY = 1160;
        }
        if(limitY < 0){
            limitY = 0;
        }
        const vehicle = {name: vehicleName, x: limitX, y: limitY, speed: vehicleSpeed, direction:direction};
        obj.Vehicles.push(vehicle);
        try{
            const response = await axios.put(`http://localhost:3030/simulation/${selectedScenario}`, obj);
            alert("Vehicle has been added.");
            setVehicleName("");
            setVehicleSpeed("");
            setX("");
            setY("");
            setDirection("Towards");
        }catch(error){
            console.log(error);
            alert("something went wrong");
        }
    }

    const handleResetData = () => {
        setVehicleName("");
        setVehicleSpeed("");
        setX("");
        setY("");
        setDirection("Towards");
    }


    return (
        <Container>
            <Sidebar class={"Add Vehicle"}/>
            <Section>
                <Title>Vehicle / add</Title>
                <Header>Add Vehicle</Header>
                <Inputcontainer>
                    <List>
                        <label htmlFor="select-scenario">Scenarios List</label>
                        <select id="select-scenario" value={selectedScenario} onChange={(event) => {setSelectedSccenario(event.target.value)}}>
                            {data.map((obj) => {
                                return <option key={obj.id} value={obj.id}>{obj.scenario}</option>
                            })}
                        </select>
                    </List>
                    <Vname>
                        <label htmlFor="v-name">Vehicle Name</label>
                        <input id="v-name" placeholder="Target abc" value={vehicleName} onChange={(event) => {setVehicleName(event.target.value)}} />
                    </Vname>
                    <Vspeed>
                        <label htmlFor="v-speed">Speed</label>
                        <input type="number" pattern="[0-9]*" id="v-speed" placeholder="2" value={vehicleSpeed} onChange={(event) => {setVehicleSpeed(event.target.value)}} />
                    </Vspeed>
                    <Positionx>
                        <label htmlFor="pos-x">Position X</label>
                        <input type="number" pattern="[0-9]*" id="pos-x" value={x} placeholder="value should be between 0-1160" onChange={(event) => {setX(event.target.value)}} />
                    </Positionx>
                    <Positiony>
                        <label htmlFor="pos-y">Position Y</label>
                        <input type="number" pattern="[0-9]*" id="pos-y" placeholder="value should be between 0-450" value={y} onChange={(event) => {setY(event.target.value)}} />
                    </Positiony>
                    <Direction>
                        <label htmlFor="direction">Direction</label>
                        <select id="direction" value={direction} onChange={(event) => {setDirection(event.target.value)}}>
                            <option value={"Towards"}>Towards</option>
                            <option value={"Backwards"}>Backwards</option>
                            <option value={"Upwards"}>Upwards</option>
                            <option value={"Downwards"}>Downwards</option>
                        </select>
                    </Direction>
                </Inputcontainer>
                <Buttons>
                    <Add onClick={AddData}>Add</Add>
                    <Reset onClick={handleResetData}>Reset</Reset>
                    <Goback onClick={() => navigate("/AllScenario")}>Go Back</Goback>
                </Buttons>

            </Section>
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
`;

const Section = styled.div`
    margin-left: 20%;
    width: 80%;
    box-sizing: border-box;
    background-color: black;
    padding: 10px 40px;
`;

const Title = styled.p`
    color: white;
`;

const Header = styled.h1`
    color: white;
    font-weight: 600;
`;

const Inputcontainer = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 10px 30px 10px;
    background-color: rgb(61, 61, 59);
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, auto);
    row-gap: 20px;
    
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > select{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Vname = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Vspeed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    & > input[type=number] {
        -moz-appearance: textfield;
    }
`;

const Positionx = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    & > input[type=number] {
    -moz-appearance: textfield;
    }
`;
const Positiony = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > input{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    & > input[type=number] {
    -moz-appearance: textfield;
    }
`;

const Direction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 5px;
    & > label{
        width: 250px;
    }
    & > select{
        height: 30px;
        width: 250px;
        background-color: rgb(61, 61, 59);
        border: 2px solid rgb(78, 242, 240);
        border-radius: 5px;
        color: white;
        box-sizing: border-box;
        padding-left: 5px;
    }
`;

const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const Add = styled.button`
    height: 35px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: rgb(74, 199, 36);
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(74, 199, 36, 0.6);
    }
`;
const Reset = styled.button`
    height: 35px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: rgb(242, 182, 29);
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(242, 182, 29, 0.6);
    }
`;
const Goback = styled.button`
    height: 35px;
    width: 120px;
    border: none;
    border-radius: 5px;
    background-color: rgb(29, 193, 242);
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;
    &:hover{
        background-color: rgba(29, 193, 242, 0.6);
    }
`;

export default Addvehiclewithparams;