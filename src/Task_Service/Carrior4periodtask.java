package Task_Service;

import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

import static java.util.concurrent.TimeUnit.*;

public class Carrior4periodtask implements Delayed {
    private final int dalta;
    private final long trigger;
    private Periodtask task;

    public Carrior4periodtask(int dalta, Periodtask task) {
        this.dalta = dalta;
        this.task=task;
        this.trigger=System.nanoTime()+NANOSECONDS.convert(dalta,MILLISECONDS);
    }


    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(trigger-System.nanoTime(),NANOSECONDS);
    }

    @Override
    public int compareTo(Delayed message) {
        Carrior4periodtask that=(Carrior4periodtask)message;
        return (this.trigger<that.trigger)?-1:((this.trigger>that.trigger)?1:0);
    }


    public int getDalta() {
        return dalta;
    }

    public long getTrigger() {
        return trigger;
    }

    public Periodtask getTask() {
        return task;
    }

    public void setTask(Periodtask task) {
        this.task = task;
    }
}
