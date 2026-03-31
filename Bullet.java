import java.awt.*;

public class Bullet {
    public double x, y;
    public double vx, vy;
    private int size = 4;
    
    public Bullet(double x, double y, double vx, double vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    
    public void update() {
        x += vx;
        y += vy;
    }
    
    public void draw(Graphics2D g) {
        g.setColor(Color.YELLOW);
        g.fillOval((int)x - size/2, (int)y - size/2, size, size);
    }
    
    public Rectangle getBounds() {
        return new Rectangle((int)x - size/2, (int)y - size/2, size, size);
    }
    
    public boolean intersects(Zombie zombie) {
        return getBounds().intersects(zombie.getBounds());
    }
}