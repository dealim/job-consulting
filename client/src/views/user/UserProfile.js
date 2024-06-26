import React, {useState} from "react";

// reactstrap componentsrom "@fortawesome/free-solid-svg-icons";
import {useLoading} from "../../contexts/LoadingProvider";
import MyHomeProgramInfo from "../../components/Infos/MyHomeProgramInfo";
import MyHomeUserInfo from "../../components/Infos/MyHomeUserInfo";
import {Col, Row} from "reactstrap";

function UserProfile() {
    const {loading, setLoading} = useLoading(false);
    const [infoLoading, setInfoLoading] = useState(false);

    const [inputValue, setInputValue] = React.useState({
        name: "",
        profileImg: "", //require("assets/img/emilyz.jpg")
        gender: "",
        pgRegStatus: "",
        resumeStatus : "",

        email: "",
        validEmail: false,
        emailUserName: "",
        domain: "",

        registeredInterviewDatetime: null,
        registeredInterviewDate: null,
        registeredInterviewTime: null,

        assignedInterviewDate: "",
    });


    return (
        <div className="content">
            {loading ? null :
                <Row>
                    <Col md="4">
                        <MyHomeUserInfo setInfoLoading={setInfoLoading} setLoading={setLoading} inputValue={inputValue} setInputValue={setInputValue} />
                    </Col>
                    <Col md="8">
                        {infoLoading && <MyHomeProgramInfo inputValue={inputValue} setInputValue={setInputValue}/> }
                    </Col>
                </Row>
            }
        </div>
    );
}

export default UserProfile;
