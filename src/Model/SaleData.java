package Model;

public class SaleData {
    private String firmname;
    private double cement;
    private double clinker;
    private double ore;
    private double daytotal;
    private double monthtotal;
    private int complete_rate;

    public String getFirmname() {
        return firmname;
    }

    public void setFirmname(String firmname) {
        this.firmname = firmname;
    }

    public double getCement() {
        return cement;
    }

    public void setCement(double cement) {
        this.cement = cement;
    }

    public double getClinker() {
        return clinker;
    }

    public void setClinker(double clinker) {
        this.clinker = clinker;
    }

    public double getOre() {
        return ore;
    }

    public void setOre(double ore) {
        this.ore = ore;
    }

    public double getDaytotal() {
        return daytotal;
    }

    public void setDaytotal(double daytotal) {
        this.daytotal = daytotal;
    }

    public double getMonthtotal() {
        return monthtotal;
    }

    public void setMonthtotal(double monthtotal) {
        this.monthtotal = monthtotal;
    }

    public int getComplete_rate() {
        return complete_rate;
    }

    public void setComplete_rate(int complete_rate) {
        this.complete_rate = complete_rate;
    }
}
