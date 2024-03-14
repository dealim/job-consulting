package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.mapper.CompanyMapper;

import java.util.HashMap;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    CompanyMapper companyMapper;
    public void comCoverLetterSave(List<ComCoverLetter> values, Long comIdx) {
        for(ComCoverLetter comCoverLetter : values) {
            HashMap map = new HashMap();
            map.put("cclComIdx", comIdx);
            map.put("cclLetterQuestion", comCoverLetter.getCclLetterQuestion().toString());
            map.put("cclMinLength", comCoverLetter.getCclMinLength());
            map.put("cclMaxLength", comCoverLetter.getCclMaxLength());
            companyMapper.ComCoverLetterinsert(map);
            //System.out.println("map = " + map);
        }

    }
}
