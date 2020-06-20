
package Bap.BapDevicewsdl;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>pageValueDTO complex type的 Java 类。
 * 
 * <p>以下模式片段指定包含在此类中的预期内容。
 * 
 * <pre>
 * &lt;complexType name="pageValueDTO"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="data" type="{http://www.w3.org/2001/XMLSchema}anyType" maxOccurs="unbounded" minOccurs="0"/&gt;
 *         &lt;element name="pagination" type="{http://ws.supcon.com}paginationDTO" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "pageValueDTO", propOrder = {
    "data",
    "pagination"
})
public class PageValueDTO {

    @XmlElement(nillable = true)
    protected List<Object> data;
    protected PaginationDTO pagination;

    /**
     * Gets the value of the data property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the data property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getData().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Object }
     * 
     * 
     */
    public List<Object> getData() {
        if (data == null) {
            data = new ArrayList<Object>();
        }
        return this.data;
    }

    /**
     * 获取pagination属性的值。
     * 
     * @return
     *     possible object is
     *     {@link PaginationDTO }
     *     
     */
    public PaginationDTO getPagination() {
        return pagination;
    }

    /**
     * 设置pagination属性的值。
     * 
     * @param value
     *     allowed object is
     *     {@link PaginationDTO }
     *     
     */
    public void setPagination(PaginationDTO value) {
        this.pagination = value;
    }

}
