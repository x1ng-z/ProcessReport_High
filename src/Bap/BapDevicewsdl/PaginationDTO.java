
package Bap.BapDevicewsdl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>paginationDTO complex type�� Java �ࡣ
 * 
 * <p>����ģʽƬ��ָ�������ڴ����е�Ԥ�����ݡ�
 * 
 * <pre>
 * &lt;complexType name="paginationDTO"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="first" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="hasNext" type="{http://www.w3.org/2001/XMLSchema}boolean"/&gt;
 *         &lt;element name="hasPre" type="{http://www.w3.org/2001/XMLSchema}boolean"/&gt;
 *         &lt;element name="no" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="size" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="totalCount" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/&gt;
 *         &lt;element name="totalPages" type="{http://www.w3.org/2001/XMLSchema}long" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "paginationDTO", propOrder = {
    "first",
    "hasNext",
    "hasPre",
    "no",
    "size",
    "totalCount",
    "totalPages"
})
public class PaginationDTO {

    protected String first;
    protected boolean hasNext;
    protected boolean hasPre;
    protected Integer no;
    protected Integer size;
    protected Long totalCount;
    protected Long totalPages;

    /**
     * ��ȡfirst���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFirst() {
        return first;
    }

    /**
     * ����first���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFirst(String value) {
        this.first = value;
    }

    /**
     * ��ȡhasNext���Ե�ֵ��
     * 
     */
    public boolean isHasNext() {
        return hasNext;
    }

    /**
     * ����hasNext���Ե�ֵ��
     * 
     */
    public void setHasNext(boolean value) {
        this.hasNext = value;
    }

    /**
     * ��ȡhasPre���Ե�ֵ��
     * 
     */
    public boolean isHasPre() {
        return hasPre;
    }

    /**
     * ����hasPre���Ե�ֵ��
     * 
     */
    public void setHasPre(boolean value) {
        this.hasPre = value;
    }

    /**
     * ��ȡno���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getNo() {
        return no;
    }

    /**
     * ����no���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setNo(Integer value) {
        this.no = value;
    }

    /**
     * ��ȡsize���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getSize() {
        return size;
    }

    /**
     * ����size���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setSize(Integer value) {
        this.size = value;
    }

    /**
     * ��ȡtotalCount���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getTotalCount() {
        return totalCount;
    }

    /**
     * ����totalCount���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setTotalCount(Long value) {
        this.totalCount = value;
    }

    /**
     * ��ȡtotalPages���Ե�ֵ��
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getTotalPages() {
        return totalPages;
    }

    /**
     * ����totalPages���Ե�ֵ��
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setTotalPages(Long value) {
        this.totalPages = value;
    }

}
