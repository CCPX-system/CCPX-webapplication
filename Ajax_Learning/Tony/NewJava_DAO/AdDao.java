package dao;
import java.util.List;

import model.ad_present;
import model.advertisement;
public interface AdDao {

	public List<ad_present> getAd();
	
	public List<advertisement> getAdBySellerID(String id);
	
	public int getNumberOfAdBySellerID(String id);
	
	public boolean addAd(advertisement newad);
	
	public advertisement getAdByAdID(String id);
	
	public boolean editAdd(advertisement ad);

}
