package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.mapper.ComCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MyInfoService {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private ProgramMapper programMapper;
    @Autowired
    private ComCoverLetterMapper comCoverLetterMapper;
    @Autowired
    private MemCoverLetterMapper memberCoverLetterMapper;

    public Member userProfileInfo(String username) {
        return memberMapper.login(username);
    }

    public ProgramCompanyDto pgInfo(Long pgIdx) {
        return programMapper.pgInfo(pgIdx);
    }

    public int[] coverLetterInfo(long idx, Long pgIdx) {
        int[] coverLetterInfo = new int[2];
        //System.out.println(comCoverLetterMapper.userCoverLetterInfo(pgIdx));
        coverLetterInfo[0] = (comCoverLetterMapper.userCoverLetterInfo(pgIdx)).size();
        coverLetterInfo[1] = memberCoverLetterMapper.coverLetterInfo(idx,pgIdx);
        //System.out.println("coverLetterInfo = " + coverLetterInfo.toString());
        return coverLetterInfo;
    }

    public void interviewTimeSave(String desiredInterviewDate, long idx) {
        memberMapper.interviewTimeSave(desiredInterviewDate, idx);
    }
}