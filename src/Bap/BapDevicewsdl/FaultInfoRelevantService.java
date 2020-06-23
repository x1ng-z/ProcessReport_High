package Bap.BapDevicewsdl;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 3.3.6
 * 2020-05-29T15:37:18.759+08:00
 * Generated source version: 3.3.6
 *
 */
@WebService(targetNamespace = "http://ws.supcon.com", name = "FaultInfoRelevantService")
@XmlSeeAlso({ObjectFactory.class})
public interface FaultInfoRelevantService {

    @WebMethod
    @RequestWrapper(localName = "genFaultInfoByItemNo", targetNamespace = "http://ws.supcon.com", className = "Bap.BapDevicewsdl.GenFaultInfoByItemNo")
    @ResponseWrapper(localName = "genFaultInfoByItemNoResponse", targetNamespace = "http://ws.supcon.com", className = "Bap.BapDevicewsdl.GenFaultInfoByItemNoResponse")
    @WebResult(name = "jwsResult", targetNamespace = "")
    public java.lang.String genFaultInfoByItemNo(

        @WebParam(name = "eamCode", targetNamespace = "")
        java.lang.String eamCode,
        @WebParam(name = "sourceType", targetNamespace = "")
        java.lang.String sourceType,
        @WebParam(name = "faultInfoType", targetNamespace = "")
        java.lang.String faultInfoType,
        @WebParam(name = "priority", targetNamespace = "")
        java.lang.String priority,
        @WebParam(name = "findStaffCode", targetNamespace = "")
        java.lang.String findStaffCode,
        @WebParam(name = "describe", targetNamespace = "")
        java.lang.String describe,
        @WebParam(name = "findTime", targetNamespace = "")
        java.lang.Long findTime
    );
}