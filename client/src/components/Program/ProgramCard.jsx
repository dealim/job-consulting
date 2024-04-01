import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCheck, faUserClock, faUsers, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {deleteProgram} from "../../apis/program";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContextProvider";

const ProgramCard = ({program, loadPrograms}) => {
    const navigate = useNavigate();
    const {roles} = useAuth();
    const handleDeleteBtn = async (id) => {
        if (window.confirm('프로그램을 삭제합니다')) {
            await deleteProgram(id);
            loadPrograms();
        }
    }

    const handleInfoBtn = (pgIdx) => {
        navigate( '../program-info/' + pgIdx)
    }

    return (
        <Card>
            <CardHeader>
                <span className="company-name">AddinEdu</span>
                <CardTitle tag="h1">{program.pgTitle}</CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <label>현재상태</label>
                        <div className="curr-status">면접 진행중</div>
                    </Col>
                </Row>
                <Row className="num-info-section">
                    <Col md='3'>
                        <div>
                            <FontAwesomeIcon icon={faUsers}/>
                        </div>
                        <label>총 참여자 수</label>
                        <div className="num-info">9명</div>
                    </Col>
                    <Col md='3'>
                        <div>
                            <FontAwesomeIcon icon={faUserCheck}/>
                        </div>
                        <label>신청자 수</label>
                        <div className="num-info">6명</div>
                    </Col>

                    {roles.isCompany
                        ?
                        <Col md='3'>
                            <div>
                                <FontAwesomeIcon icon={faUserClock}/>
                            </div>
                            <label>미확인 수</label>
                            <div className="num-info">4명</div>
                        </Col>
                        :
                        <Col md='3'>
                            <div>
                                <FontAwesomeIcon icon={faUserTie}/>
                            </div>
                            <label>면접 참여자 수</label>
                            <div className="num-info">4명</div>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col md="6">
                        <label>신청기간</label>
                        <div className="form-control"><span>2023. 12. 01</span> ~ <span>2023. 12. 01</span></div>
                    </Col>
                    <Col md="6">
                        <label>교육기간</label>
                        <div className="form-control"><span>2023. 12. 01</span> ~ <span>2023. 12. 01</span></div>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label>교육내용</label>
                        <div className="form-control">짧은 교육내용 요약을 여기에 입력</div>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter >
                <Button onClick={() => handleInfoBtn(program.pgIdx)}>상세정보</Button>
                {roles.isCompany ? <Button onClick={() => handleDeleteBtn(program.pgIdx)}>삭제</Button> : null}
            </CardFooter>
        </Card>
    );
};

export default ProgramCard;