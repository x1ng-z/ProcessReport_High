
package Bap.BapDevicewsdl;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the Bap.BapDevicewsdl package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GenFaultInfoByItemNo_QNAME = new QName("http://ws.supcon.com", "genFaultInfoByItemNo");
    private final static QName _GenFaultInfoByItemNoResponse_QNAME = new QName("http://ws.supcon.com", "genFaultInfoByItemNoResponse");
    private final static QName _SimulationMap_QNAME = new QName("http://ws.supcon.com", "simulationMap");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: Bap.BapDevicewsdl
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GenFaultInfoByItemNo }
     * 
     */
    public GenFaultInfoByItemNo createGenFaultInfoByItemNo() {
        return new GenFaultInfoByItemNo();
    }

    /**
     * Create an instance of {@link GenFaultInfoByItemNoResponse }
     * 
     */
    public GenFaultInfoByItemNoResponse createGenFaultInfoByItemNoResponse() {
        return new GenFaultInfoByItemNoResponse();
    }

    /**
     * Create an instance of {@link SimulationMap }
     * 
     */
    public SimulationMap createSimulationMap() {
        return new SimulationMap();
    }

    /**
     * Create an instance of {@link HashMap }
     * 
     */
    public HashMap createHashMap() {
        return new HashMap();
    }

    /**
     * Create an instance of {@link ArrayList }
     * 
     */
    public ArrayList createArrayList() {
        return new ArrayList();
    }

    /**
     * Create an instance of {@link PageValueDTO }
     * 
     */
    public PageValueDTO createPageValueDTO() {
        return new PageValueDTO();
    }

    /**
     * Create an instance of {@link PaginationDTO }
     * 
     */
    public PaginationDTO createPaginationDTO() {
        return new PaginationDTO();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GenFaultInfoByItemNo }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link GenFaultInfoByItemNo }{@code >}
     */
    @XmlElementDecl(namespace = "http://ws.supcon.com", name = "genFaultInfoByItemNo")
    public JAXBElement<GenFaultInfoByItemNo> createGenFaultInfoByItemNo(GenFaultInfoByItemNo value) {
        return new JAXBElement<GenFaultInfoByItemNo>(_GenFaultInfoByItemNo_QNAME, GenFaultInfoByItemNo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GenFaultInfoByItemNoResponse }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link GenFaultInfoByItemNoResponse }{@code >}
     */
    @XmlElementDecl(namespace = "http://ws.supcon.com", name = "genFaultInfoByItemNoResponse")
    public JAXBElement<GenFaultInfoByItemNoResponse> createGenFaultInfoByItemNoResponse(GenFaultInfoByItemNoResponse value) {
        return new JAXBElement<GenFaultInfoByItemNoResponse>(_GenFaultInfoByItemNoResponse_QNAME, GenFaultInfoByItemNoResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SimulationMap }{@code >}
     * 
     * @param value
     *     Java instance representing xml element's value.
     * @return
     *     the new instance of {@link JAXBElement }{@code <}{@link SimulationMap }{@code >}
     */
    @XmlElementDecl(namespace = "http://ws.supcon.com", name = "simulationMap")
    public JAXBElement<SimulationMap> createSimulationMap(SimulationMap value) {
        return new JAXBElement<SimulationMap>(_SimulationMap_QNAME, SimulationMap.class, null, value);
    }

}
