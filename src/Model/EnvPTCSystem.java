package Model;

import java.util.Map;

/**
 * @author zzx
 * @version 1.0
 * @date 2020/6/20 14:22
 */
public class EnvPTCSystem {
    private String productline;
    private String firedsystemno;
    private int type;
    private Map<String,Tag4properties> TagMapping;

    public String getProductline() {
        return productline;
    }

    public void setProductline(String productline) {
        this.productline = productline;
    }

    public String getFiredsystemno() {
        return firedsystemno;
    }

    public void setFiredsystemno(String firedsystemno) {
        this.firedsystemno = firedsystemno;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Map<String, Tag4properties> getTagMapping() {
        return TagMapping;
    }

    public void setTagMapping(Map<String, Tag4properties> tagMapping) {
        TagMapping = tagMapping;
    }
}
