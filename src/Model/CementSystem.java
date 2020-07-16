package Model;

import java.util.Map;

/**
 * @author zzx
 * @version 1.0
 * @date 2020/7/15 11:04
 */
public class CementSystem {
    private String productline;
    private String cementsystemno;
    private Integer type;

    /**系统位号：key:tagName;value object for Tag4properties*/
    private Map<String,Tag4properties> TagMapping;

    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    public String getCementsystemno() {
        return cementsystemno;
    }

    public void setCementsystemno(String cementsystemno) {
        this.cementsystemno = cementsystemno;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Map<String, Tag4properties> getTagMapping() {
        return TagMapping;
    }

    public void setTagMapping(Map<String, Tag4properties> tagMapping) {
        TagMapping = tagMapping;
    }
}
