import React, {useEffect, useState} from "react";

// reactstrap components
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table,} from "reactstrap";
import {useAuth} from "../../contexts/AuthContextProvider";
import {getAllUserMembers} from "../../apis/user";
import {useNavigate} from "react-router-dom";
import {Pagination, SelectPicker} from "rsuite";

function MemberList() {
    const {isLogin} = useAuth()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [userList, setUserList] = useState(null)
    const [regStatus, setRegStatus] = useState('')
    const regStatusSelect = ['가입대기', '확인', '거절'].map(
        item => ({label: item, value: item})
    );
    useEffect(() => {
        if (isLogin) {
            getAllUserMembers(page - 1, pageSize).then(res => {
                setUserList(res.data.content)
                setTotalPage(res.data.totalElements)
            })
        }
    }, [isLogin, page, pageSize]);

    useEffect(() => {
        console.log(regStatus)
    }, [regStatus]);

    return (
        <div className="content member-list">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">학생 정보</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="table-header">
                                총 학생 수 : {totalPage}
                            </div>
                            <Table className="member-table" responsive>
                                <thead className="text-primary">
                                <tr className="text-center">
                                    <th>아이디</th>
                                    <th>이름</th>
                                    <th>연락처</th>
                                    <th>성별</th>
                                    <th>자소서</th>
                                    <th>이력서</th>
                                    <th>면접</th>
                                    <th>프로그램</th>
                                    <th>신청 상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userList?.map(({member, pgTitle}, idx) => (
                                        <tr key={member.username} className="text-center">
                                            <td>
                                                <a onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate(`/company/user-profile/${member.idx}`)
                                                }}>
                                                    {member.username}
                                                </a>
                                            </td>
                                            <td>{member.name}</td>
                                            <td>{member.phone}</td>
                                            <td>{member.gender}</td>
                                            <td>{member.coverLetterStatus}</td>
                                            <td>{member.resumeStatus}</td>
                                            <td>{member.interviewStatus}</td>
                                            <td>{pgTitle}</td>
                                            <td>
                                                <SelectPicker
                                                    onChange={setRegStatus}
                                                    data={regStatusSelect}
                                                    searchable={false}
                                                    style={{width: 120}}
                                                    defaultValue={member.pgRegStatus === 'Pending' ? '가입대기' :
                                                        member.pgRegStatus === 'Approved' ? '확인' :
                                                            member.pgRegStatus === 'Rejected' ? '거절' : ''}
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </Table>
                            <Pagination
                                layout={['-', 'pager', '-']}
                                prev
                                last
                                next
                                first
                                size="sm"
                                total={totalPage}
                                limit={pageSize}
                                activePage={page}
                                onChangePage={setPage}
                                maxButtons={10}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default MemberList;
