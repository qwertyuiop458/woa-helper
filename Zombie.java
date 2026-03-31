import java.awt.*;

public class Zombie {
    public int x, y;
    private double speed;
    private int size = 15;
    
    public Zombie(int x, int y) {
        this.x = x;
        this.y = y;
        this.speed = 1.0;
    }
    
    public void update(int targetX, int targetY) {
        // Move towards target
        double dx = targetX - x;
        double dy = targetY - y;
        double distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            x += (dx / distance) * speed;
            y += (dy / distance) * speed;
        }
    }
    
    public void draw(Graphics2D g) {
        g.setColor(Color.GREEN);
        g.fillOval(x - size/2, y - size/2, size, size);
    }
    
    public Rectangle getBounds() {
        return new Rectangle(x - size/2, y - size/2, size, size);
    }
    
    public boolean intersects(Player player) {
        return getBounds().intersects(player.getBounds());
    }
}