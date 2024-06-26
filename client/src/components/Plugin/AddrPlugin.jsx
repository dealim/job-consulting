import React from 'react';
import {useDaumPostcodePopup} from 'react-daum-postcode';
import {Button, Col, Input, Row} from "reactstrap";

const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const Postcode = ({setInputValue , inputValue}) => {
    const open = useDaumPostcodePopup(scriptUrl);
    const [data, setData] = React.useState({})

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setData(data)
        setInputValue(prev => ({...prev, address: fullAddress, zipCode: data.zonecode}))
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <Row>
            <Col md={7}>
                <Input
                    id="exampleCity"
                    name="address"
                    value={data.address ? data.address : inputValue.address}
                    onChange={() => setInputValue(prev => ({...prev, address: data.address ? data.address : inputValue.address}))}
                    placeholder="도로명주소"
                />
            </Col>
            <Col md={3}>
                <Input
                    id="exampleState"
                    name="zip"
                    value={data.zonecode ? data.zonecode : inputValue.zipCode}
                    placeholder="우편번호"
                    onChange={() => setInputValue(prev => ({...prev, zipCode: data.zonecode ? data.zonecode : inputValue.zipCode}))}
                    disabled
                />
            </Col>
            <Col>
                <Button type='button' onClick={handleClick}>
                    우편번호 찾기
                </Button>
            </Col>
        </Row>
    );
};

export default Postcode;
