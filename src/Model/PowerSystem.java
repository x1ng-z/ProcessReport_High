package Model;

import java.util.HashMap;
import java.util.Map;

/**
 * @author zzx
 * @version 1.0
 * @date 2021/5/21 8:43
 */
public class PowerSystem {
    private String productline;
    private String yuresystemno;
    private Integer type;

    /**
     * 系统位号：key:tagName;value object for Tag4properties
     */
    private Map<String, Tag4properties> TagMapping;

    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    public String getYuresystemno() {
        return yuresystemno;
    }

    public void setYuresystemno(String yuresystemno) {
        this.yuresystemno = yuresystemno;
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


    public PowerSystem powerClone() {
        PowerSystem powerSystem = new PowerSystem();
        powerSystem.setProductline(productline);
        powerSystem.setType(type);
        powerSystem.setYuresystemno(yuresystemno);
        if (TagMapping != null && TagMapping.size() != 0) {
            Map<String, Tag4properties> tmptags = new HashMap<>();
            TagMapping.forEach((k, v) -> {
                tmptags.put(k, v.tagclone());
            });
            powerSystem.setTagMapping(tmptags);
        }
        return powerSystem;
    }

}
