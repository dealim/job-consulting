import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Dropdown, List, Popover, Whisper} from "rsuite";
import {getOccupiedSlot, updateInterviewStatus} from "../../apis/company";
import {useCurrProg} from "../../contexts/CurrProgProvider";

const InterviewCard = () => {
    const [occupiedSlot, setOccupiedSlot] = useState(null);
    const [times, setTimes] = useState(null);
    const [days, setDays] = useState(null);
    const [reservations, setReservations] = useState(null);
    const {currProg, setCurrProg} = useCurrProg();

    useEffect(() => {
        getOccupiedSlot(currProg).then((res) => {
            const newReservations = res.data.reduce((acc, {slotStartDatetime, name, idx, interviewStatus, phone}) => {
                const day = slotStartDatetime?.split("T")[0];
                const time = slotStartDatetime?.split("T")[1].substring(0, 5);

                if (!acc[day]) {
                    acc[day] = {};
                }
                if (!acc[day][time]) {
                    acc[day][time] = [];
                }

                acc[day][time].push({name, idx, interviewStatus, phone});

                return acc;
            }, {});

            setOccupiedSlot(res.data);
            setReservations(newReservations);
        })
    }, [currProg]);

    useEffect(() => {
        if (occupiedSlot) {
            const slot = occupiedSlot[0];
            setTimes(generateTimeList(slot?.pgInterviewValStartTime, slot?.pgInterviewValEndTime, slot?.pgInterviewUnitTime));
            setDays(getDatesBetween(new Date(slot?.pgInterviewValStartDate), new Date(slot?.pgInterviewValEndDate)));
        }
    }, [occupiedSlot]);

    function generateTimeList(startTime, endTime, intervalMinutes) {
        const times = [];
        const [startHour, startMinute] = startTime?.split(":").map(Number);
        const [endHour, endMinute] = endTime?.split(":").map(Number);

        let currentMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;

        while (currentMinutes <= endMinutes) {
            const hours = Math.floor(currentMinutes / 60);
            const minutes = currentMinutes % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            times.push(formattedTime);
            currentMinutes += parseInt(intervalMinutes);
        }

        return times;
    }

    function getDatesBetween(startDate, endDate) {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate)); // 현재 날짜의 복사본을 배열에 추가
            currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
        }

        return dates.map(date =>
            `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        );
    }

    const renderInterviewMenu = ({onClose, left, top, className}, {idx, phone, day, time}, ref) => {
        const handleSelect = (eventKey) => {
            onClose()
            setReservations(prev => {
                const updated = {...prev};
                const reservationList = updated[day][time];
                const reservationIndex = reservationList.findIndex(r => r.idx === idx);

                if (reservationIndex > -1) {
                    if (eventKey === 1) {
                        reservationList[reservationIndex].interviewStatus = 'Approved';
                        updateInterviewStatus(idx, 'Approved').then((res) => {
                            console.log(res.data)
                        })
                    } else if (eventKey === 2) {
                        reservationList[reservationIndex].interviewStatus = 'Registered';
                        updateInterviewStatus(idx, 'Registered').then((res) => {
                            console.log(res.data)
                        })
                    } else if (eventKey === 3) {
                        reservationList[reservationIndex].interviewStatus = 'Rejected';
                        updateInterviewStatus(idx, 'Rejected').then((res) => {
                            console.log(res.data)
                        })
                    }
                }

                return updated;
            });
        };
        return (
            <Popover ref={ref} className={className} style={{left, top}} full>
                <Dropdown.Menu onSelect={handleSelect}>
                    {/*<Dropdown.Menu title="New File">*/}
                    {/*    <Dropdown.Item eventKey={1}>New File</Dropdown.Item>*/}
                    {/*    <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>*/}
                    {/*</Dropdown.Menu>*/}
                    <Dropdown.Item eventKey={1} style={{color: "rgba(54, 162, 235, 1)"}}>확정</Dropdown.Item>
                    <Dropdown.Item eventKey={2} style={{color: "rgba(75, 192, 192, 1)"}}>신청</Dropdown.Item>
                    <Dropdown.Item eventKey={3} style={{color: "rgba(255, 99, 132, 1)"}}>거절</Dropdown.Item>
                </Dropdown.Menu>
            </Popover>
        );
    };

    return (
        <Card className="interview-card">
            <CardHeader>
                <Row>
                    <Col className="text-left" sm="6">
                        <h5 className="card-category">interview Time Data</h5>
                        <CardTitle tag="h2">시간대별 면접자 현황</CardTitle>
                    </Col>
                    <Col sm="6">
                        <ButtonGroup
                            className="btn-group-toggle float-right"
                            data-toggle="buttons"
                        >
                            <Button
                                tag="label"
                                className="btn-simple btn btn-info btn-sm approved"
                            >
                                            <span className="">
                                              확정
                                            </span>
                                <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                            </Button>
                            <Button
                                tag="label"
                                className="btn-simple btn btn-info btn-sm registered"
                            >
                                            <span className="">
                                              신청
                                            </span>
                                <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                            </Button>
                            <Button
                                tag="label"
                                className="btn-simple btn btn-info btn-sm rejected"
                            >
                                            <span className="">
                                              거절
                                            </span>
                                <span className="d-block d-sm-none">
                                              <i className="tim-icons icon-single-02"/>
                                            </span>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    <List>
                        <List.Item className="date_list">
                            <div className="date"></div>
                            <div className="time">
                                <ul>
                                    {days?.map((day, index) => (
                                        <li key={index}>
                                            {new Date(day).getMonth() + 1}월 {new Date(day).getDate()}일
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </List.Item>
                        {times?.map((time, index) => (
                            <List.Item key={index} className="time_list">
                                <div className="date">{time}</div>
                                <div className="time">
                                    <ul>
                                        {days?.map((day, index) => (
                                            <li key={index}>
                                                <ButtonGroup
                                                    className="btn-group-toggle"
                                                    data-toggle="buttons">
                                                    {reservations?.[day]?.[time]?.map(({
                                                                                           name,
                                                                                           idx,
                                                                                           interviewStatus,
                                                                                           phone
                                                                                       }, index) => (
                                                        <div key={idx}>
                                                            <Whisper placement="bottomStart" trigger="click"
                                                                     speaker={(props, ref) => renderInterviewMenu(props, {
                                                                         idx,
                                                                         phone,
                                                                         day,
                                                                         time
                                                                     }, ref)}>
                                                                <Button
                                                                    tag="label"
                                                                    className={"btn-simple btn btn-info btn-sm " + interviewStatus.toLowerCase()}
                                                                >
                                                                    {name}
                                                                </Button>
                                                            </Whisper>
                                                        </div>
                                                    ))}
                                                </ButtonGroup>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </CardBody>
            <CardFooter>
                시간당 면접자 수 : {occupiedSlot?.[0]?.pgMaxIntervieweesPerUnit}
            </CardFooter>
        </Card>
    );
};

export default InterviewCard;